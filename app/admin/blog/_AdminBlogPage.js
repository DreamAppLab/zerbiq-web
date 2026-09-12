'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, app } from '@/lib/firebase';
import { CATEGORIES, categoryStyle } from '@/lib/categories';

const ALLOWED_EMAIL = 'lab@dreamapplab.com';

// ─── helpers ────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function fmtDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const STATUS_BADGE = {
  draft:     { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.6)', label: 'Draft' },
  published: { bg: 'rgba(0,180,120,0.15)',   text: '#00c87a',               label: 'Published' },
  scheduled: { bg: 'rgba(255,160,0,0.15)',   text: '#ffb020',               label: 'Scheduled' },
};

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  author: '',
  category: CATEGORIES[0],
  tags: '',
  featuredImage: '',
  metaTitle: '',
  metaDescription: '',
  scheduledFor: '',
  status: 'draft',
  source: 'admin',
};

// ─── component ───────────────────────────────────────────────────────────────

export default function AdminBlogPage() {
  const auth = getAuth(app);

  // Auth state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Post list
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Editor state
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  // Quill
  const editorContainerRef = useRef(null);
  const quillRef = useRef(null);
  const [htmlMode, setHtmlMode] = useState(false);
  const [rawHtml, setRawHtml] = useState('');

  // ── auth ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, [auth]);

  async function handleSignIn() {
    const provider = new GoogleAuthProvider();
    try { await signInWithPopup(auth, provider); }
    catch (e) { alert(e.message); }
  }

  // ── Quill init ────────────────────────────────────────────────────────────

  // Inject Quill CDN CSS + dark overrides once
  useEffect(() => {
    if (document.getElementById('quill-css')) return;
    const link = document.createElement('link');
    link.id = 'quill-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.quilljs.com/1.3.7/quill.snow.css';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = 'quill-dark';
    style.textContent = `
      .ql-toolbar.ql-snow { background: #1E1E2A; border-color: rgba(255,255,255,0.1) !important; border-bottom-color: rgba(255,255,255,0.06) !important; }
      .ql-toolbar .ql-stroke { stroke: rgba(255,255,255,0.6); }
      .ql-toolbar .ql-fill  { fill:   rgba(255,255,255,0.6); }
      .ql-toolbar .ql-picker-label { color: rgba(255,255,255,0.6); }
      .ql-toolbar button:hover .ql-stroke, .ql-toolbar .ql-active .ql-stroke { stroke: #3D5CFF !important; }
      .ql-toolbar button:hover .ql-fill,   .ql-toolbar .ql-active .ql-fill   { fill:   #3D5CFF !important; }
      .ql-container.ql-snow { border-color: rgba(255,255,255,0.1) !important; background: #14141C; }
      .ql-editor { color: rgba(255,255,255,0.85); min-height: 380px; font-size: 15px; line-height: 1.75; }
      .ql-editor.ql-blank::before { color: rgba(255,255,255,0.3); }
      .ql-picker-options { background: #1E1E2A !important; border-color: rgba(255,255,255,0.1) !important; }
      .ql-picker-item { color: rgba(255,255,255,0.7) !important; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!user || user.email !== ALLOWED_EMAIL) return;
    if (htmlMode) return;

    let isMounted = true;
    let quillInstance = null;

    async function initQuill() {
      // wait for container to be rendered
      await new Promise((r) => setTimeout(r, 80));
      if (!isMounted || !editorContainerRef.current) return;

      const Quill = (await import('quill')).default;

      if (!isMounted || !editorContainerRef.current || quillRef.current) return;

      quillInstance = new Quill(editorContainerRef.current, {
        theme: 'snow',
        placeholder: 'Write your post here…',
        modules: {
          toolbar: [
            [{ header: [2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });

      // Set initial content
      if (form.body) quillInstance.clipboard.dangerouslyPasteHTML(form.body);

      quillInstance.on('text-change', () => {
        const html = quillInstance.root.innerHTML;
        setForm((prev) => ({ ...prev, body: html }));
      });

      quillRef.current = quillInstance;
    }

    initQuill();

    return () => {
      isMounted = false;
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, htmlMode]);

  // ── load posts ────────────────────────────────────────────────────────────

  const loadPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email === ALLOWED_EMAIL) loadPosts();
  }, [user, loadPosts]);

  // ── form helpers ──────────────────────────────────────────────────────────

  function setField(k, v) {
    setForm((prev) => {
      const next = { ...prev, [k]: v };
      if (k === 'title' && !editingId) next.slug = slugify(v);
      if (k === 'title' && !prev.metaTitle) next.metaTitle = v.slice(0, 60);
      return next;
    });
  }

  function loadPost(post) {
    const tagsStr = Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '');
    const scheduledForStr = post.scheduledFor
      ? (post.scheduledFor.toDate ? post.scheduledFor.toDate() : new Date(post.scheduledFor))
          .toISOString()
          .slice(0, 16)
      : '';
    const next = {
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      body: post.body || '',
      author: post.author || '',
      category: post.category || CATEGORIES[0],
      tags: tagsStr,
      featuredImage: post.featuredImage || '',
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      scheduledFor: scheduledForStr,
      status: post.status || 'draft',
      source: post.source || 'admin',
    };
    setForm(next);
    setEditingId(post.id);
    setHtmlMode(false);
    quillRef.current = null; // force Quill re-init
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setHtmlMode(false);
    quillRef.current = null;
  }

  // ── sync HTML mode ────────────────────────────────────────────────────────

  function toggleHtmlMode() {
    if (!htmlMode) {
      // entering source mode — grab current Quill HTML
      const html = quillRef.current ? quillRef.current.root.innerHTML : form.body;
      setRawHtml(html);
      setForm((p) => ({ ...p, body: html }));
    } else {
      // leaving source mode — apply raw HTML back; Quill re-inits via useEffect
      setForm((p) => ({ ...p, body: rawHtml }));
      quillRef.current = null;
    }
    setHtmlMode((p) => !p);
  }

  // ── save ──────────────────────────────────────────────────────────────────

  async function save(statusOverride) {
    setSaving(true);
    setNotice('');
    try {
      const body = htmlMode ? rawHtml : (quillRef.current ? quillRef.current.root.innerHTML : form.body);
      const tagsArray = form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const status = statusOverride || form.status;

      const data = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        body,
        author: form.author,
        category: form.category,
        tags: tagsArray,
        featuredImage: form.featuredImage,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        status,
        source: form.source || 'admin',
        updatedAt: serverTimestamp(),
      };

      if (status === 'published' && !editingId) data.publishedAt = serverTimestamp();
      if (status === 'scheduled' && form.scheduledFor) {
        data.scheduledFor = Timestamp.fromDate(new Date(form.scheduledFor));
      }

      if (editingId) {
        if (status === 'published') {
          const existing = posts.find((p) => p.id === editingId);
          if (!existing?.publishedAt) data.publishedAt = serverTimestamp();
        }
        await updateDoc(doc(db, 'posts', editingId), data);
        setNotice('✓ Post updated.');
      } else {
        data.createdAt = serverTimestamp();
        const ref = await addDoc(collection(db, 'posts'), data);
        setEditingId(ref.id);
        setNotice('✓ Post saved.');
      }

      setForm((p) => ({ ...p, status }));
      await loadPosts();
    } catch (e) {
      setNotice('✗ Error: ' + e.message);
    } finally {
      setSaving(false);
    }
  }

  // ── guards ────────────────────────────────────────────────────────────────

  if (authLoading) {
    return <CenterMsg>Loading…</CenterMsg>;
  }

  if (!user) {
    return (
      <CenterMsg>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Blog Admin</h2>
        <button onClick={handleSignIn} style={btnStyle('#3D5CFF')}>
          Sign in with Google
        </button>
      </CenterMsg>
    );
  }

  if (user.email !== ALLOWED_EMAIL) {
    return (
      <CenterMsg>
        <p style={{ marginBottom: 16, color: 'rgba(255,255,255,0.7)' }}>
          Access denied — {user.email}
        </p>
        <button onClick={() => signOut(auth)} style={btnStyle('rgba(255,255,255,0.1)')}>
          Sign out
        </button>
      </CenterMsg>
    );
  }

  // ── main UI ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: '#fff', fontFamily: 'var(--font-family)' }}>
      {/* Header */}
      <header
        style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-white-10)',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.03em' }}>
            Zerbiq <span style={{ color: 'var(--color-primary)' }}>Blog Admin</span>
          </span>
          <a href="/blog" target="_blank" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none' }}>
            View blog ↗
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{user.email}</span>
          <button onClick={() => signOut(auth)} style={btnStyle('rgba(255,255,255,0.08)', 12)}>
            Sign out
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 0, minHeight: 'calc(100vh - 57px)' }}>
        {/* ── Left: Editor ── */}
        <div style={{ padding: '28px 32px', borderRight: '1px solid var(--color-white-10)' }}>
          {/* Toolbar row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>
                {editingId ? 'Edit Post' : 'New Post'}
              </h2>
              {editingId && (
                <button onClick={resetForm} style={btnStyle('rgba(255,255,255,0.06)', 12)}>
                  + New
                </button>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={toggleHtmlMode}
                style={btnStyle(htmlMode ? 'rgba(61,92,255,0.3)' : 'rgba(255,255,255,0.06)', 12)}
              >
                {htmlMode ? 'Visual Editor' : 'HTML Source'}
              </button>
            </div>
          </div>

          {/* Title */}
          <input
            placeholder="Post title"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            style={inputStyle({ fontSize: 22, fontWeight: 800, marginBottom: 16 })}
          />

          {/* Excerpt */}
          <textarea
            placeholder="Excerpt (shown on listing page)"
            value={form.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
            rows={2}
            style={inputStyle({ fontSize: 14, marginBottom: 16, resize: 'vertical' })}
          />

          {/* Quill / HTML textarea */}
          <div style={{ marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-white-10)' }}>
            {htmlMode ? (
              <textarea
                value={rawHtml}
                onChange={(e) => setRawHtml(e.target.value)}
                rows={22}
                style={{
                  width: '100%',
                  background: 'var(--color-surface)',
                  color: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  padding: '14px 16px',
                  fontFamily: 'monospace',
                  fontSize: 13,
                  lineHeight: 1.6,
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
            ) : (
              <div
                ref={editorContainerRef}
                style={{ minHeight: 400, background: 'var(--color-surface)' }}
              />
            )}
          </div>

          {/* Notice */}
          {notice && (
            <p style={{ fontSize: 13, color: notice.startsWith('✓') ? '#00c87a' : '#ff5096', marginBottom: 16 }}>
              {notice}
            </p>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => save('draft')}
              disabled={saving || !form.title}
              style={btnStyle('rgba(255,255,255,0.08)')}
            >
              {saving ? 'Saving…' : 'Save as Draft'}
            </button>
            <button
              onClick={() => save('published')}
              disabled={saving || !form.title}
              style={btnStyle('var(--color-primary)')}
            >
              Publish Now
            </button>
            <button
              onClick={() => save('scheduled')}
              disabled={saving || !form.title || !form.scheduledFor}
              style={btnStyle('rgba(255,160,0,0.25)')}
              title={!form.scheduledFor ? 'Set a scheduled date in the sidebar first' : ''}
            >
              Schedule
            </button>
          </div>
        </div>

        {/* ── Right: Metadata sidebar ── */}
        <div style={{ padding: '28px 20px', background: 'var(--color-surface)', overflowY: 'auto' }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)', margin: '0 0 18px' }}>
            Metadata
          </h3>

          <Label>Slug</Label>
          <input
            value={form.slug}
            onChange={(e) => setField('slug', slugify(e.target.value))}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
            placeholder="post-url-slug"
          />

          <Label>Category</Label>
          <select
            value={form.category}
            onChange={(e) => setField('category', e.target.value)}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <Label>Author</Label>
          <input
            value={form.author}
            onChange={(e) => setField('author', e.target.value)}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
            placeholder="Author name"
          />

          <Label>Tags (comma-separated)</Label>
          <input
            value={form.tags}
            onChange={(e) => setField('tags', e.target.value)}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
            placeholder="crm, invoicing, field service"
          />

          <Label>Featured Image URL</Label>
          <input
            value={form.featuredImage}
            onChange={(e) => setField('featuredImage', e.target.value)}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
            placeholder="https://…"
          />

          <Label>
            Meta Title&nbsp;
            <span style={{ color: form.metaTitle.length > 60 ? '#ff5096' : 'rgba(255,255,255,0.35)' }}>
              ({form.metaTitle.length}/60)
            </span>
          </Label>
          <input
            value={form.metaTitle}
            onChange={(e) => setField('metaTitle', e.target.value)}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
            placeholder="SEO title (≤ 60 chars)"
            maxLength={80}
          />

          <Label>
            Meta Description&nbsp;
            <span style={{ color: form.metaDescription.length > 160 ? '#ff5096' : 'rgba(255,255,255,0.35)' }}>
              ({form.metaDescription.length}/160)
            </span>
          </Label>
          <textarea
            value={form.metaDescription}
            onChange={(e) => setField('metaDescription', e.target.value)}
            rows={3}
            style={inputStyle({ fontSize: 13, marginBottom: 14, resize: 'vertical' })}
            placeholder="SEO description (≤ 160 chars)"
            maxLength={200}
          />

          <Label>Scheduled Publish Date</Label>
          <input
            type="datetime-local"
            value={form.scheduledFor}
            onChange={(e) => setField('scheduledFor', e.target.value)}
            style={inputStyle({ fontSize: 13, marginBottom: 14 })}
          />

          {/* Status indicator */}
          {editingId && (() => {
            const b = STATUS_BADGE[form.status] || STATUS_BADGE.draft;
            return (
              <div style={{ marginTop: 8 }}>
                <Label>Status</Label>
                <span
                  style={{
                    display: 'inline-block',
                    background: b.bg,
                    color: b.text,
                    borderRadius: 6,
                    padding: '3px 10px',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {b.label}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Post List ── */}
      <section style={{ padding: '40px 32px', borderTop: '1px solid var(--color-white-10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>All Posts</h3>
          <button onClick={loadPosts} style={btnStyle('rgba(255,255,255,0.06)', 12)}>
            {loadingPosts ? 'Loading…' : '↻ Refresh'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {posts.map((post) => {
            const b = STATUS_BADGE[post.status] || STATUS_BADGE.draft;
            const colors = categoryStyle(post.category);
            return (
              <div
                key={post.id}
                style={{
                  background: 'var(--color-raised)',
                  border: '1px solid var(--color-white-10)',
                  borderRadius: 10,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                {/* Status badge */}
                <span
                  style={{
                    background: b.bg,
                    color: b.text,
                    borderRadius: 6,
                    padding: '2px 9px',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                  }}
                >
                  {b.label}
                </span>

                {/* Category */}
                <span
                  style={{
                    background: colors.bg,
                    color: colors.text,
                    borderRadius: 6,
                    padding: '2px 9px',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                  }}
                >
                  {post.category}
                </span>

                {/* Title */}
                <span style={{ flex: 1, fontWeight: 700, fontSize: 14, minWidth: 0 }}
                  className="truncate"
                >
                  {post.title}
                </span>

                {/* Date */}
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
                  {fmtDate(post.createdAt)}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => loadPost(post)} style={btnStyle('rgba(61,92,255,0.2)', 12)}>
                    Edit
                  </button>
                  {post.slug && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ ...btnStyle('rgba(255,255,255,0.06)', 12), textDecoration: 'none' }}
                    >
                      View ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
          {!loadingPosts && posts.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>No posts yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── tiny UI helpers ──────────────────────────────────────────────────────────

function CenterMsg({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: '#fff',
        fontFamily: 'var(--font-family)',
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.45)',
        marginBottom: 5,
      }}
    >
      {children}
    </label>
  );
}

function inputStyle(extra = {}) {
  return {
    display: 'block',
    width: '100%',
    background: 'var(--color-raised)',
    border: '1px solid var(--color-white-10)',
    borderRadius: 7,
    color: '#fff',
    padding: '9px 12px',
    fontSize: 14,
    outline: 'none',
    ...extra,
  };
}

function btnStyle(bg, fontSize = 14) {
  return {
    background: bg,
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: 7,
    padding: '8px 16px',
    fontSize,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-family)',
  };
}
