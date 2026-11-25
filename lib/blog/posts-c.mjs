// Blog posts, part C. Same format as posts-a.mjs.

export const POSTS_C = [
  {
    slug: 'track-technician-time-pay-and-job-costing',
    title: 'Tracking Technician Time, Pay, and Job Costing Basics',
    metaTitle: 'Track Technician Time, Pay, and Job Costing | Zerbiq',
    description:
      'Learn how to track field technician hours, choose a pay method, and calculate job costs so you know which jobs, routes, and crews really make money.',
    category: 'Team Management',
    publishedAt: '2026-11-16',
    updatedAt: '2026-11-25',
    answer: `To track technician time and job costs, record clock-in and clock-out times, tie hours to specific jobs, log the materials used, and add them up against what you charged. Whether you pay hourly, by commission, or per job, the same records show you which jobs, routes, and crews are profitable.`,
    takeaways: [
      'Track time by job, not just by day, so labor can be tied to revenue.',
      'Log materials used on each job along with the hours.',
      'Pick a pay method that matches how your work is priced.',
      'Compare estimated cost to actual cost on a regular schedule.',
      'Use the numbers to fix prices and routes, not to blame crews.',
    ],
    sections: [
      {
        h: 'Why job costing matters',
        body: [
          `Revenue is what you billed. Profit is what is left after labor, materials, and the cost of getting there. If you only look at revenue, a busy route can hide a money-losing one.`,
          `Job costing sounds like an accountant's chore, but the basic version is simple: for each job, add up the labor and materials it took, and compare that to the price. You do not need perfect numbers, only consistent ones.`,
        ],
      },
      {
        h: 'Step 1: Track time in a way crews will actually use',
        body: [
          `The best time system is the one your team uses without fuss. Clock-in and clock-out from a phone, with hours assigned to the job being worked, covers most field companies.`,
          `Zerbiq's time tracking and timecards show how long every job takes, with clock-in and clock-out, labor assigned to each job, and timecards ready for payroll. Check the [features page](/features) for what each plan includes.`,
          { h3: 'What to record' },
          {
            ul: [
              `Start and end time for the workday.`,
              `Time spent on each job or stop.`,
              `Drive time between stops, since you pay for it.`,
              `Breaks, as your local rules require.`,
            ],
          },
          `Rules about breaks, overtime, and recordkeeping vary by state, so check with your state labor department or an advisor.`,
        ],
      },
      {
        h: 'Step 2: Track materials and equipment',
        body: [
          `Chemicals, fertilizer, parts, and supplies are real costs that vanish into a gut feeling if you do not log them. Record what is used on each job, and set reorder points so you never run out on a route.`,
          `Zerbiq's materials and inventory tools let you track every product and supply used in the field, log usage per job, and see stock levels. For vehicles and equipment, keep a maintenance record so repair costs are visible too.`,
        ],
      },
      {
        h: 'Step 3: Choose a pay method that fits your pricing',
        body: [
          `How you pay should line up with how you charge. Three common methods:`,
          {
            ul: [
              `**Hourly**: simple, and fair when the work varies a lot. The risk is that a slow job costs you more.`,
              `**Commission**: a percentage of the job's revenue, which rewards upselling but can feel unpredictable.`,
              `**Per job (piece rate)**: a set amount per completed job, which rewards speed and keeps costs predictable if quality is checked.`,
            ],
          },
          `Zerbiq lets you pay your team by commission or by the job and see what each person earned on every completed job, on Field plans and above. It records pay for your own payroll; it is not a payroll service. Employment and wage rules differ by state and by worker type, so confirm your approach with a payroll provider or advisor.`,
        ],
      },
      {
        h: 'Step 4: Compare estimated and actual costs',
        body: [
          `Once you have time and materials by job, compare them to what you expected when you quoted or priced the work. The gap is where the learning is.`,
          {
            ol: [
              `Pick a set of jobs, such as one route for one month.`,
              `Add labor hours (including drive time) and materials for each.`,
              `Compare that cost to what each job brought in.`,
              `Flag the jobs where cost is close to or above revenue.`,
              `Decide whether to change the price, the time allowed, or the service.`,
            ],
          },
          `Zerbiq's advanced reports and job costing, available on Command plans and above, show what each job costs in labor and materials and compare estimated to actual. See the [pricing page](/pricing) for the plan breakdown.`,
        ],
      },
      {
        h: 'Step 5: Use the numbers to improve, not to punish',
        body: [
          `Crews notice when data is used against them. If the numbers show that a route runs long, ask why before assuming anyone is slow. Often the cause is an overpacked route, a hard property, or an old price.`,
          `Share the findings with the team and ask for their ideas. Techs know where the time goes. For pricing fixes, read [how to price recurring services](/blog/how-to-price-recurring-services), and for route fixes, [how to build efficient service routes](/blog/how-to-build-efficient-service-routes).`,
        ],
      },
      {
        h: 'Subcontractors and employees',
        body: [
          `If you mix employees and 1099 subcontractors, keep their time and payments separate. The rules for each are different, and mixing the records creates headaches at tax time. Zerbiq lets you add 1099 subcontractors alongside W-2 employees, assign jobs, track hours, and manage payments separately. Talk to your accountant about how to classify workers.`,
        ],
      },
      {
        h: 'A weekly time and cost checklist',
        body: [
          {
            ul: [
              `Are all timecards complete and approved?`,
              `Do hours match the jobs that were actually done?`,
              `Were materials logged against jobs?`,
              `Which jobs or routes ran over their time?`,
              `What is one thing to change next week?`,
            ],
          },
          `Want to see time tracking and job costing on a real route? [Book a demo](https://calendly.com/zerbiq-demos/30min).`,
        ],
      },
    ],
    faq: [
      {
        q: 'What is job costing in field service?',
        a: `Job costing means adding up the labor and materials a job required and comparing that total to what you charged, so you can see whether the job was profitable.`,
      },
      {
        q: 'How should I pay field technicians: hourly or per job?',
        a: `Hourly suits variable work, per-job pay suits repeatable work with checked quality, and commission rewards sales. Choose the method that matches how you price, and confirm wage rules for your state.`,
      },
      {
        q: 'Is Zerbiq a payroll service?',
        a: `No. Zerbiq records time and per-job or commission pay for your own payroll, but it is not a payroll service.`,
      },
      {
        q: 'Do I need to track drive time?',
        a: `Yes, for costing. Drive time is usually paid time, so it belongs in your cost per job. Wage rules vary, so check requirements for your state.`,
      },
    ],
    related: [
      'how-to-price-recurring-services',
      'how-to-build-efficient-service-routes',
      'field-service-software-buyers-guide',
    ],
  },

  {
    slug: 'estimates-and-quotes-that-close',
    title: 'How to Write Estimates and Quotes That Actually Close',
    metaTitle: 'Estimates and Quotes That Close | Zerbiq',
    description:
      'Win more jobs with clear estimates: itemize the work, set expiry dates, follow up fast, and make approval a one-tap decision for your customer.',
    category: 'Growth',
    publishedAt: '2026-11-19',
    updatedAt: '2026-11-25',
    answer: `An estimate that closes is fast, clear, and easy to approve. Send it the same day you visit, itemize the work in plain English, show the total and what happens next, set an expiry date, and follow up within a couple of days. Let the customer approve with one tap instead of printing, signing, and scanning.`,
    takeaways: [
      'Speed wins: send the estimate the same day if you can.',
      'Itemize the work in plain language, with a clear total.',
      'Include what is not covered, to prevent disputes later.',
      'Set an expiry date and follow up on a schedule.',
      'Make approval a one-step action on a phone.',
    ],
    sections: [
      {
        h: 'Why estimates stall',
        body: [
          `Most lost estimates are not lost on price. They are lost on silence. The owner measured the job on Monday, wrote the numbers on a notepad, sent a PDF on Friday, and never followed up. In the meantime the customer called someone else who replied faster.`,
          `The fix is a small process: respond quickly, write clearly, make approval easy, and follow up on a rhythm.`,
        ],
      },
      {
        h: 'Step 1: Respond fast',
        body: [
          `When a lead comes in, answer quickly and set a visit time. The customer who hears from you first, with a clear plan, starts the comparison in your favor.`,
          `Capturing leads in one place helps. Zerbiq's lead management gives you a Kanban pipeline, and you can add a lead capture form to your website with one line of code so inquiries go straight into the pipeline. See the [features page](/features).`,
        ],
      },
      {
        h: 'Step 2: Write the estimate in plain English',
        body: [
          `A strong estimate has these parts:`,
          {
            ol: [
              `**A short description of the work**, in the customer's words.`,
              `**An itemized list**: services, materials, and any extras, with prices.`,
              `**The total**, easy to find.`,
              `**What is not included**, so there are no surprises.`,
              `**Timing**: when you can start and how long it should take.`,
              `**An expiry date**, so the price is not open forever.`,
            ],
          },
          `Avoid jargon. If a customer cannot explain your estimate to their spouse in one sentence, simplify it.`,
        ],
      },
      {
        h: 'Step 3: Offer options',
        body: [
          `Giving two or three choices, such as a basic and a complete package, turns the question from "should I hire this company" into "which option do I want." A middle option often wins, and a higher one gives you room to be paid well for extra work.`,
          `Be honest about what each option includes. Tie the price to the work, using your cost numbers from [how to price recurring services](/blog/how-to-price-recurring-services).`,
        ],
      },
      {
        h: 'Step 4: Make approval a one-tap decision',
        body: [
          `Every extra step between "looks good" and "approved" loses some customers. A phone-friendly estimate that can be approved immediately, without creating an account, removes the friction.`,
          `Zerbiq lets you create estimates in seconds and send them by email, or by text with the optional texting add-on. Customers approve with one tap and no login is required. Estimates and quotes are available on every plan.`,
        ],
      },
      {
        h: 'Step 5: Follow up on a schedule',
        body: [
          `Most deals are closed on the second or third touch. A simple cadence:`,
          {
            ul: [
              `The day after sending: a short message to confirm they received it.`,
              `A few days later: ask whether they have questions.`,
              `Near the expiry date: let them know the price is about to lapse.`,
              `After that: a polite closing note and an open door.`,
            ],
          },
          `Zerbiq's automated follow-up sequences, on Command plans and above, send a series of messages to leads and inactive customers so the follow-up happens even when you are on a job site.`,
        ],
      },
      {
        h: 'Step 6: Turn the approval into a job',
        body: [
          `The moment the customer says yes, the work should become a scheduled job with a route, a price, and a recurrence if it repeats. Retyping an approved estimate into a calendar is where errors sneak in.`,
          `Also tell the customer what happens next: when the crew will arrive, how invoices work, and how they can pay. Setting expectations now prevents disputes later. See [how to invoice from the field](/blog/invoice-from-the-field-get-paid-faster).`,
        ],
      },
      {
        h: 'Keep the estimate and the job in sync',
        body: [
          `If the scope changes after approval, update the estimate and tell the customer right away. A quiet change in price or work is the single most common cause of a disputed invoice. Write the change down, send it, and get a quick yes before the crew starts.`,
          `That small habit protects your margin and your reputation at the same time.`,
        ],
      },
      {
        h: 'What to do when the answer is no',
        body: [
          `Ask politely why. Price, timing, and trust are the usual reasons, and each one tells you something. Keep the lead in your system and check in at a sensible time, such as the start of next season. A no today is sometimes a yes in six months.`,
          `For a view of the whole sales-to-service flow, [book a demo](https://calendly.com/zerbiq-demos/30min) or see what each plan includes on the [pricing page](/pricing).`,
        ],
      },
    ],
    faq: [
      {
        q: 'What should be included in a service estimate?',
        a: `A description of the work, an itemized price list, the total, what is not included, timing, and an expiry date. Plain language works better than technical terms.`,
      },
      {
        q: 'How quickly should I send an estimate?',
        a: `As soon as you can, ideally the same day as the visit. Speed signals reliability and keeps you ahead of competitors who reply later.`,
      },
      {
        q: 'How often should I follow up on an estimate?',
        a: `Follow up a day after sending, again a few days later, and once more near the expiry date. A short, friendly note is enough each time.`,
      },
      {
        q: 'Can customers approve estimates without creating an account?',
        a: `With Zerbiq, yes. Customers approve an estimate with one tap and no login is required.`,
      },
    ],
    related: [
      'how-to-price-recurring-services',
      'invoice-from-the-field-get-paid-faster',
      'customer-retention-and-review-requests-for-service-companies',
    ],
  },

  {
    slug: 'what-a-customer-crm-should-track-for-a-service-business',
    title: 'What a Customer CRM Should Track for a Service Business',
    metaTitle: 'What a Service Business CRM Should Track | Zerbiq',
    description:
      'A customer CRM for field service should hold contacts, property notes, service history, invoices, photos, and preferences. Here is a practical checklist.',
    category: 'Tools',
    publishedAt: '2026-11-22',
    updatedAt: '2026-11-25',
    answer: `A CRM for a service business should track contact details, service address and access notes, service history, recurring schedules, invoices and payments, photos, equipment, and communication preferences. The goal is that anyone in the office or field can open a customer record and know what was done, what is owed, and what the customer expects next.`,
    takeaways: [
      'Store the property details, not just the person.',
      'Keep service history, invoices, and notes together in one record.',
      'Record communication preferences and respect them.',
      'Attach photos and equipment details to the right customer.',
      'Check for duplicates before adding a new customer.',
    ],
    sections: [
      {
        h: 'What makes a service CRM different',
        body: [
          `A sales CRM tracks a person through a pipeline. A field service CRM tracks a person and a place, over time. The same customer might have a gate code, a dog, two properties, a weekly visit, and an unpaid invoice, and the office needs all of that at hand when the phone rings.`,
          `A good record turns every call from a search through old messages into a thirty-second lookup.`,
        ],
      },
      {
        h: 'The essential fields',
        body: [
          `Start with these, and add more only if you will use them:`,
          {
            ul: [
              `**Contact details**: name, phone, email, and a preferred way to be reached.`,
              `**Service address**: and a billing address if it is different.`,
              `**Access notes**: gate codes, pets, parking, and who to call on arrival.`,
              `**Services and schedule**: what is done, how often, and on which route.`,
              `**Pricing**: the agreed price or rate for each service.`,
              `**Billing details**: invoice history, payment method, and any balance.`,
            ],
          },
        ],
      },
      {
        h: 'Service history',
        body: [
          `The history of each visit is the most useful part of a record. It answers questions like: When was this last done? Who did it? Was there a problem? What did we promise?`,
          `Zerbiq gives every customer a complete profile, with contact info, service history, invoices, notes, photos, and equipment logs in one place. Customers can also view their own service history, including visit photos, in the customer portal.`,
        ],
      },
      {
        h: 'Photos and equipment',
        body: [
          `Photos protect you and delight customers. A before-and-after picture settles most disputes in seconds, and a photo of a worn part supports an upsell without a hard sell.`,
          `If you service equipment, such as pool pumps, HVAC units, or water heaters, record the make, model, and installation date, with maintenance history. That turns reminders into a service you can sell.`,
        ],
      },
      {
        h: 'Communication preferences and history',
        body: [
          `Record how each customer likes to be contacted, and what you have already told them. Whether it is a text before arrival or an email invoice, respecting the preference is a quiet form of good service.`,
          `Keep a log of important conversations. When someone else answers the phone next time, the customer should not have to start over. Connect this to your messages, such as reminders and [on-the-way notices](/blog/technician-on-the-way-notifications).`,
        ],
      },
      {
        h: 'Avoid duplicates and stale records',
        body: [
          `Duplicates cause double billing, missed visits, and confusing history. Before adding a new customer, search by name, phone, and address. If you import customers from a spreadsheet or QuickBooks, clean the list first.`,
          `Review your records every few months: remove customers who have left, fix outdated phone numbers, and mark seasonal customers so they do not clutter active routes. Our guide to [moving from spreadsheets](/blog/move-from-spreadsheets-or-whiteboard-to-field-service-software) includes a list-cleaning checklist.`,
        ],
      },
      {
        h: 'Privacy and access',
        body: [
          `A customer record contains personal information, so limit who can see what. Field techs usually need the address, the service, and the access notes, but not billing details. Zerbiq lets you add team members with a role and permission level, so field techs see only what they need while admins and managers see everything.`,
          `Be clear about how you handle customer data in your own privacy policy, and export or remove data when a customer asks, following the rules that apply to you.`,
        ],
      },
      {
        h: 'Start small and grow the record',
        body: [
          `Do not try to capture everything on day one. Start with the essential fields above, then add one new habit at a time: a note after every visit, a photo on arrival, a call log after every conversation. Records that people actually fill in beat perfect records that stay empty.`,
          `Ask the team what they wish they had known at the door last week. The answer usually points straight at the next field to add.`,
        ],
      },
      {
        h: 'A one-page CRM checklist',
        body: [
          {
            ul: [
              `Can I find a customer by name, phone, or address in seconds?`,
              `Does each record show service history, balance, and notes?`,
              `Are photos and equipment attached to the right place?`,
              `Do I know how each customer wants to be contacted?`,
              `Are duplicates and old records cleaned up regularly?`,
            ],
          },
          `If you are comparing tools, our [buyer's guide](/blog/field-service-software-buyers-guide) has a scorecard. To see a customer record in Zerbiq, [book a demo](https://calendly.com/zerbiq-demos/30min), or check which plan fits on the [pricing page](/pricing).`,
        ],
      },
    ],
    faq: [
      {
        q: 'What is a CRM for a field service business?',
        a: `It is a customer record system built around people and properties. It holds contacts, addresses, service history, invoices, photos, and notes so your whole team can see the same information.`,
      },
      {
        q: 'What fields should every customer record have?',
        a: `Contact details, service address, access notes, services and schedule, pricing, billing details, and communication preferences. Add photos and equipment where they apply.`,
      },
      {
        q: 'How do I avoid duplicate customers?',
        a: `Search by name, phone, and address before adding someone new, and clean imported lists before loading them. Review your records regularly.`,
      },
      {
        q: 'Should technicians see billing information?',
        a: `Usually not. Give techs the details they need to do the job and limit billing data to the office roles. Role and permission settings make that possible.`,
      },
    ],
    related: [
      'field-service-software-buyers-guide',
      'customer-retention-and-review-requests-for-service-companies',
      'move-from-spreadsheets-or-whiteboard-to-field-service-software',
    ],
  },

  {
    slug: 'sales-tax-basics-for-service-invoices',
    title: 'Sales Tax Basics for Service Invoices: A Plain-English Guide',
    metaTitle: 'Sales Tax Basics for Service Invoices | Zerbiq',
    description:
      'Do you charge sales tax on services? It depends on your state and the work. A plain-English guide to the questions to ask, with a not-tax-advice note.',
    category: 'Invoicing',
    publishedAt: '2026-11-25',
    updatedAt: '2026-11-25',
    answer: `Whether you charge sales tax on a service invoice depends on your state, the type of service, and sometimes the customer. Some states tax few services, others tax many, and materials or parts are often taxed differently from labor. Check with your state's revenue department or an accountant before you set tax on any invoice.`,
    takeaways: [
      'Sales tax rules for services differ widely from state to state.',
      'Labor and materials are often taxed differently.',
      'Some customers, such as certain nonprofits, may be exempt with paperwork.',
      'Show tax as its own line on the invoice.',
      'Confirm everything with your state or an accountant.',
    ],
    sections: [
      {
        h: 'Not tax or legal advice',
        body: [
          `This article is general information, not tax or legal advice. Sales tax rules change, vary by state, and sometimes by city or county. Confirm your obligations with your state's department of revenue or a qualified accountant before you act on anything here.`,
        ],
      },
      {
        h: 'Why services are confusing',
        body: [
          `Many people think sales tax applies to things you can hold, and services are exempt. That is a decent rule of thumb in some states, but not a rule. Some states tax a broad list of services, some tax a few, and some tax services in certain categories, such as repair or maintenance work.`,
          `Tax authorities, accounting providers, and state websites publish state-by-state guides on which services are taxable. Treat any summary as a starting point and verify against your own state's current rules.`,
        ],
      },
      {
        h: 'The questions to ask for each service',
        body: [
          `Use this list when you sit down with your accountant or state website:`,
          {
            ol: [
              `**Is the service itself taxable in my state?** Cleaning, landscaping, pool service, pest control, and repair may be treated differently.`,
              `**Are materials or parts taxable?** Even when labor is not, products you supply may be.`,
              `**Does the answer change for residential and commercial customers?**`,
              `**Is the rate set at the state, county, or city level, and which applies at the service address?**`,
              `**Do I need a sales tax permit or registration before I charge tax?**`,
              `**How and when do I file and remit what I collect?**`,
            ],
          },
          `Write down the answers for each service you sell. The result is your tax rulebook.`,
        ],
      },
      {
        h: 'Mixed invoices: labor, materials, and fees',
        body: [
          `A single invoice can include several kinds of charges: labor, parts, a trip fee, a late fee. Each might be taxed differently. Itemize them so the tax applies to the right lines, and so you can explain the bill if a customer asks.`,
          `Clear itemization also helps with estimates. If you quote materials and labor separately, the invoice will match. See [estimates and quotes that close](/blog/estimates-and-quotes-that-close).`,
        ],
      },
      {
        h: 'Exempt customers',
        body: [
          `Some customers, such as certain government bodies, nonprofits, or resellers, may be exempt from sales tax, but they generally need to provide paperwork. Keep the exemption certificate on file with the customer record, and note it clearly so the office does not charge tax by mistake. A good customer record makes this easy; see [what a CRM should track](/blog/what-a-customer-crm-should-track-for-a-service-business).`,
        ],
      },
      {
        h: 'Show tax clearly on the invoice',
        body: [
          `Whatever applies, make it visible. Show the tax as its own line, with the rate or label, so customers can see what they are paying and you can reconcile it later.`,
          `If you use accounting software, make sure the invoice details flow through. Zerbiq syncs invoices and payments back to QuickBooks Online automatically, so your books stay clean without double entry. Ask your accountant how to set up tax in your accounting system, and check the [features page](/features) for what Zerbiq's invoicing covers.`,
        ],
      },
      {
        h: 'Keep good records',
        body: [
          `Tax questions usually arrive months later. Keep clean records of every invoice, payment, and exemption certificate. Export your data regularly; Zerbiq lets you export invoices and other records to CSV or PDF at any time.`,
          `Record when you started charging tax on a service, and why, so that a change in the rules is easy to apply from a clear date.`,
        ],
      },
      {
        h: 'When your business crosses state lines',
        body: [
          `If you serve customers in more than one state, or sell products as well as services, the rules multiply. Each state decides for itself when a business must register, collect, and file. Do not assume that the rules where your office sits apply where your customer's property is.`,
          `The practical step is to list every location you serve, then ask your accountant or each state's revenue website what applies there. It is a one-time project that saves a very unpleasant letter later.`,
        ],
      },
      {
        h: 'A short sales tax checklist',
        body: [
          {
            ul: [
              `Have I checked whether each of my services is taxable in my state?`,
              `Do I know how materials and labor are treated?`,
              `Am I registered or permitted where required?`,
              `Is tax a separate line on every invoice?`,
              `Do I have exemption certificates on file where needed?`,
            ],
          },
          `For the rest of the billing process, read [how to invoice from the field and get paid faster](/blog/invoice-from-the-field-get-paid-faster). To see invoicing in action, [book a demo](https://calendly.com/zerbiq-demos/30min), or review plans on the [pricing page](/pricing). Again, this is general information and not tax or legal advice.`,
        ],
      },
    ],
    faq: [
      {
        q: 'Do I charge sales tax on services?',
        a: `It depends on your state and the type of service. Some states tax few services and others tax many. Check with your state's revenue department or an accountant.`,
      },
      {
        q: 'Are materials taxed differently from labor?',
        a: `Often yes. Even where labor is not taxed, products or parts you supply may be. Itemize them on the invoice so each line is treated correctly.`,
      },
      {
        q: 'How do I handle a tax-exempt customer?',
        a: `Ask for their exemption certificate, keep it with the customer record, and note the exemption so tax is not charged by mistake. Requirements vary by state.`,
      },
      {
        q: 'Is this article tax advice?',
        a: `No. It is general information only. Confirm your obligations with your state's revenue department or a qualified accountant.`,
      },
    ],
    related: [
      'invoice-from-the-field-get-paid-faster',
      'estimates-and-quotes-that-close',
      'how-to-price-recurring-services',
    ],
  },
];
