// Blog posts, part A. Plain data: no markup. Paragraphs may use [text](/path) links and **bold**.
// Only describe Zerbiq with what the site's own pages state (see /features, /pricing, /support).

export const POSTS_A = [
  {
    slug: 'how-to-build-efficient-service-routes',
    title: 'How to Build Efficient Service Routes for a Field Service Business',
    metaTitle: 'How to Build Efficient Service Routes | Zerbiq',
    description:
      'A practical way to build service routes that cut drive time: group by area, balance the day, leave buffer, and review the route every month.',
    category: 'Operations',
    publishedAt: '2026-10-21',
    updatedAt: '2026-11-18',
    answer: `An efficient service route groups stops by neighborhood, keeps the same crew in the same area, orders stops to avoid backtracking, and leaves a small buffer for surprises. Build routes around where customers are, not the day they asked for, then adjust for access windows, job length, and each tech's skills.`,
    takeaways: [
      'Group stops by geography first, then balance the workload per day.',
      'Keep one crew in one area so they learn the properties and the traffic.',
      'Plan for job length, not just drive time, and leave a buffer on every route.',
      'Review each route on a schedule, because customers come and go.',
      'Put the route on every tech phone so the office is not the only place it lives.',
    ],
    sections: [
      {
        h: 'Why route design matters more than most owners think',
        body: [
          `Every minute a truck sits in traffic is a minute nobody pays for. In lawn care, pool service, cleaning, pest control, and similar recurring work, the margin is often decided by how many stops a crew can finish in a day, and that depends more on the shape of the route than on how fast anyone works.`,
          `A good route is not a clever trick. It is a repeatable habit: put nearby customers together, give each crew a home territory, and look at the map again whenever something changes.`,
        ],
      },
      {
        h: 'Step 1: Start from the map, not the calendar',
        body: [
          `Most owners build routes from the calendar: Mrs. Lopez wants Tuesdays, so Tuesday it is. That is how a truck ends up crossing town three times in one day.`,
          `Flip it. Put every recurring customer on a map, look for natural clusters, and assign each cluster to a day. Then talk to the few customers whose preferred day breaks the cluster. Many will happily move if you offer a reason, such as a consistent arrival window.`,
          { h3: 'Clusters beat straight lines' },
          `Think in neighborhoods, not roads. A cluster of eight stops within a few blocks is worth more than a long line of stops along one highway, because you can reorder inside the cluster when something runs long.`,
        ],
      },
      {
        h: 'Step 2: Balance the day by work, not by stop count',
        body: [
          `Ten stops are not always ten stops. A quick pool check and a full-property lawn cut are different amounts of work. Give every service a realistic duration and add up the day, including drive time between stops.`,
          `Use a simple checklist when you size a route:`,
          {
            ol: [
              `List the stops and the typical time each one takes on site.`,
              `Add the drive time between them, using the real route, not a straight line.`,
              `Add a buffer for gate codes, dogs, weather, and the customer who wants to talk.`,
              `Compare the total to the crew's real working hours, minus breaks and loading time.`,
              `Move stops between days until no day is far heavier than the others.`,
            ],
          },
          `If you do not track how long jobs really take, start now. Even rough start and finish times for two weeks will show you which routes are overpacked and which have room for another customer. Zerbiq's time tracking and timecards can capture that for you; the [features page](/features) lists what each plan includes.`,
        ],
      },
      {
        h: 'Step 3: Keep crews in their territory',
        body: [
          `When the same crew services the same neighborhood week after week, they learn which gates stick, which customer wants a text first, and which street is a mess at 8 a.m. That knowledge is hard to write down and easy to lose when you shuffle people daily.`,
          `Territories also make coverage easier. If a tech calls out, you already know which neighboring route has the most slack.`,
        ],
      },
      {
        h: 'Step 4: Sequence the stops',
        body: [
          `Inside a day, order matters. A few rules of thumb work well:`,
          {
            ul: [
              `Start at the farthest cluster from the yard only if you will finish near it; otherwise start close and work outward, then loop home.`,
              `Put time-sensitive customers first, such as commercial sites that must be done before opening.`,
              `Put jobs that need special materials or a second person together, so the truck is loaded once.`,
              `Keep the last stop flexible, so overruns do not push into the next day.`,
            ],
          },
          `Software can do this ordering for you. Zerbiq lets you build and reorder routes, assign stops, and drag to reorder. On Field plans and above, Route Intelligence sequences your stops to minimize drive time and fuel, and finds the nearest available tech when an urgent job comes in. Check the [pricing page](/pricing) for what each plan includes.`,
        ],
      },
      {
        h: 'Step 5: Get the route to the field',
        body: [
          `A route that lives on the owner's whiteboard is a route that gets misread. Send each tech their stops for the day on their phone, with the address, the service, and any notes about the property. Zerbiq pushes routes to your team's phones with one tap, and your team can use the iOS and Android apps or the team view in a smartphone browser.`,
          `Make it normal for techs to leave a note when something about a stop changes. Next month's route review is only as good as the notes that feed it.`,
        ],
      },
      {
        h: 'Step 6: Review routes on a schedule',
        body: [
          `Routes decay. Customers cancel, new ones sign up, and a route that was tight in spring is lopsided by fall. Put a route review on the calendar once a month, and use the same short list each time:`,
          {
            ul: [
              `Which route runs long most often, and why?`,
              `Which route finishes early, and could it take one more stop?`,
              `Which new customers sit far from every existing cluster?`,
              `Did any customer's preferred day cause extra driving?`,
            ],
          },
          `The last question is a pricing question too. A customer far from every cluster costs more to serve, which you can reflect in the price. See our guide on [how to price recurring services](/blog/how-to-price-recurring-services).`,
        ],
      },
      {
        h: 'Common route-planning mistakes',
        body: [
          `Watch for these:`,
          {
            ul: [
              `Planning for a perfect day. Plan for a normal one.`,
              `Letting a single high-maintenance customer set the day for a whole cluster.`,
              `Ignoring the yard. Time spent loading, fueling, and dumping is part of the route.`,
              `Never removing a bad stop. Sometimes the right fix is a price increase or a polite goodbye.`,
            ],
          },
          `If you are still planning routes on paper, our post on [moving from spreadsheets or a whiteboard to software](/blog/move-from-spreadsheets-or-whiteboard-to-field-service-software) covers how to switch without losing a week. When you are ready to see route building in action, you can [book a demo](https://calendly.com/zerbiq-demos/30min).`,
        ],
      },
    ],
    faq: [
      {
        q: 'How many stops should a service route have?',
        a: `There is no universal number. It depends on how long each service takes and how far apart the stops are. Add up on-site time, drive time, and a buffer, then compare that to your crew's working hours.`,
      },
      {
        q: 'Should I build routes by day of the week or by area?',
        a: `Build by area first. Group customers into geographic clusters, then assign each cluster to a day. Move individual customers only when their preferred day would force extra driving.`,
      },
      {
        q: 'How often should I redo my service routes?',
        a: `Review them monthly and rebuild whenever you add or lose several customers in the same area. Small adjustments more often beat one big overhaul once a year.`,
      },
      {
        q: 'Can software optimize my routes automatically?',
        a: `Yes. Zerbiq's Route Intelligence, available on Field plans and above, sequences stops to minimize drive time and fuel. You can still reorder stops by hand.`,
      },
    ],
    related: [
      'schedule-recurring-service-jobs-without-spreadsheets',
      'technician-on-the-way-notifications',
      'how-to-price-recurring-services',
    ],
  },

  {
    slug: 'schedule-recurring-service-jobs-without-spreadsheets',
    title: 'How to Schedule Recurring Service Jobs Without Spreadsheets',
    metaTitle: 'Schedule Recurring Service Jobs Without Spreadsheets',
    description:
      'Weekly, biweekly, monthly, or quarterly service: how to set up recurring jobs once, handle holidays and skips, and stop re-entering the same visits.',
    category: 'Operations',
    publishedAt: '2026-10-24',
    updatedAt: '2026-11-19',
    answer: `To schedule recurring service jobs without spreadsheets, define each service once with its frequency (weekly, biweekly, monthly, or quarterly), attach it to a customer and a route, and let software create each visit automatically. Handle holidays and skips with written rules, and review the schedule monthly instead of retyping it.`,
    takeaways: [
      'Set a recurring job up once, with a frequency, a route, and a price.',
      'Decide in advance what happens on holidays, rain days, and skipped visits.',
      'Keep the recurring schedule separate from one-time extras.',
      'Billing should follow the schedule, not a separate list.',
      'Audit the schedule monthly to catch customers who quietly dropped off.',
    ],
    sections: [
      {
        h: 'Why spreadsheets break down for recurring work',
        body: [
          `A spreadsheet is a fine place to start. A row per customer, a column per week, and you have a schedule. The trouble begins around the time you have more than a few dozen recurring customers.`,
          `Every holiday means editing a row. Every new customer means copying a pattern. Every skipped visit has to be remembered at billing time. The sheet becomes a second job, and when the one person who understands it is out sick, the schedule goes with them.`,
        ],
      },
      {
        h: 'The four common recurring patterns',
        body: [
          `Most field service companies fit their customers into four patterns:`,
          {
            ul: [
              `**Weekly**: lawn care, pool service, and most commercial cleaning.`,
              `**Biweekly**: smaller lawns, some cleaning accounts, and routine inspections.`,
              `**Monthly**: pest control programs, filter changes, and some cleaning.`,
              `**Quarterly**: seasonal treatments, deep cleans, and equipment checks.`,
            ],
          },
          `Zerbiq supports each of these. You set a recurring job once, and Zerbiq handles the rest for weekly, biweekly, monthly, and quarterly jobs automatically.`,
        ],
      },
      {
        h: 'Step 1: Write down your service catalog',
        body: [
          `Before you schedule anything, list the services you sell and how often each one repeats. A short, consistent list prevents the habit of inventing a new service name for every customer, which makes reporting and billing messy later.`,
          `For each service, note a typical duration, who can do it, and any materials it uses. If it helps, add the skills a tech needs, so a pool chemical job does not land on someone untrained.`,
        ],
      },
      {
        h: 'Step 2: Attach every recurring job to a route',
        body: [
          `A recurring job without a route is just a reminder. Tie each job to a route and a day, so the schedule and the map agree. If you have not built your routes yet, start with our guide to [building efficient service routes](/blog/how-to-build-efficient-service-routes).`,
          `Keep one-time extras, such as a mulch install or a one-off deep clean, separate from the recurring pattern. When extras are mixed into the recurring schedule, someone eventually deletes the wrong one.`,
        ],
      },
      {
        h: 'Step 3: Decide what happens on holidays and skips',
        body: [
          `Write these rules down once, then follow them every time:`,
          {
            ol: [
              `On a closed day, do you skip the visit, move it to the next day, or schedule a makeup visit?`,
              `If weather cancels a visit, is it rescheduled, or does the customer wait until the next regular visit?`,
              `If a customer asks to skip a week, is that billed, credited, or free?`,
              `How do you tell the customer about each of these changes?`,
            ],
          },
          `Zerbiq's holiday management lets you set your closed days once and choose to skip the service, bump it to the next day, or schedule a makeup visit, with customers notified automatically. The point is that a rule lives in the system rather than in someone's memory.`,
        ],
      },
      {
        h: 'Step 4: Make billing follow the schedule',
        body: [
          `The most expensive spreadsheet mistake is billing from a different list than the one you serviced from. When the schedule and the billing are separate, missed visits get billed and completed visits get forgotten.`,
          `Zerbiq's billing cycles let you create named cycles, such as monthly on the 1st, biweekly, or quarterly, assign routes to them, and generate one invoice per customer at the end of each cycle. For more on getting paid, see [how to invoice from the field and get paid faster](/blog/invoice-from-the-field-get-paid-faster).`,
        ],
      },
      {
        h: 'Step 5: Audit the schedule every month',
        body: [
          `Even good systems drift. A short monthly audit catches the problems early:`,
          {
            ul: [
              `Customers who have gone several visits without a completed job.`,
              `Recurring jobs with no route, or on a route that no longer exists.`,
              `Customers who pay for weekly service but are visited biweekly, or the reverse.`,
              `Jobs that always run long and need a longer time slot or a higher price.`,
            ],
          },
          `Reports help here. Zerbiq's reports show revenue by route, tech, or service type, and job completion percentages, so you can spot the outliers without scanning rows.`,
        ],
      },
      {
        h: 'How to switch without losing a week',
        body: [
          `Do not try to move everything in one afternoon. Pick one route, set up its recurring jobs, run it in parallel with your sheet for a couple of weeks, then move the next route. Zerbiq also lets you export your data to CSV or PDF at any time.`,
          `Our [spreadsheet-to-software guide](/blog/move-from-spreadsheets-or-whiteboard-to-field-service-software) walks through the full switch. To see recurring jobs set up live, [book a demo](https://calendly.com/zerbiq-demos/30min), or review plans on the [pricing page](/pricing).`,
        ],
      },
    ],
    faq: [
      {
        q: 'What is a recurring job in field service software?',
        a: `A recurring job is a service you define once with a frequency, such as weekly or monthly. The software then creates each visit on the schedule instead of you entering it every time.`,
      },
      {
        q: 'How do I handle holidays on a recurring schedule?',
        a: `Decide your rule in advance: skip the visit, move it to the next day, or add a makeup visit. Then let your software apply that rule and notify customers, rather than editing each visit by hand.`,
      },
      {
        q: 'Can I run weekly and quarterly customers on the same route?',
        a: `Yes. Different frequencies can share a route and a day. The schedule simply shows which visits fall on which dates, so a quarterly job appears only in its quarter.`,
      },
      {
        q: 'How do I bill recurring jobs without missing a visit?',
        a: `Bill from the same records you schedule from. A billing cycle that gathers completed visits and creates one invoice per customer avoids the mismatch that happens with separate lists.`,
      },
    ],
    related: [
      'how-to-build-efficient-service-routes',
      'invoice-from-the-field-get-paid-faster',
      'move-from-spreadsheets-or-whiteboard-to-field-service-software',
    ],
  },

  {
    slug: 'invoice-from-the-field-get-paid-faster',
    title: 'How to Invoice From the Field and Get Paid Faster',
    metaTitle: 'Invoice From the Field and Get Paid Faster | Zerbiq',
    description:
      'Send invoices the moment a job is done and offer card, ACH, and cash. A simple field invoicing workflow plus reminders that cut chasing.',
    category: 'Invoicing',
    publishedAt: '2026-10-28',
    updatedAt: '2026-11-20',
    answer: `To get paid faster, invoice the moment a job is marked complete, send it by email or text, and let customers pay by card, ACH, or cash. Set automatic reminders for overdue balances and agree on payment terms upfront. The shorter the gap between finishing the work and sending the bill, the shorter the wait for payment.`,
    takeaways: [
      'Create the invoice when the job is completed, not at the end of the week.',
      'Offer more than one way to pay: card, ACH, and cash.',
      'State payment terms on every invoice and in every estimate.',
      'Automate reminders so chasing money is not a daily chore.',
      'Keep your books in sync so nobody retypes an invoice.',
    ],
    sections: [
      {
        h: 'Why late invoices mean late payments',
        body: [
          `Customers pay when the memory of the service is fresh. A bill that arrives two weeks after the visit is easy to set aside, and a bill that never arrives because it was stuck in a notebook is the worst case of all.`,
          `Field service owners often run on thin cash cushions. Paying techs, buying chemicals and fuel, and covering insurance all happen on a schedule that does not wait for customers. Faster invoicing is the cheapest cash-flow improvement available.`,
        ],
      },
      {
        h: 'Step 1: Invoice at job completion',
        body: [
          `The simplest rule is the best one: the invoice is created when the job is marked complete. No batching, no Friday paperwork. In Zerbiq, invoices are generated the moment a job is marked complete, and you can send them by email in one click (or by text with the optional texting add-on).`,
          `For recurring customers who prefer one monthly bill, use a billing cycle instead. Zerbiq can generate one invoice per customer at the end of each cycle, so you still send a single clean statement. We cover that setup in [scheduling recurring jobs without spreadsheets](/blog/schedule-recurring-service-jobs-without-spreadsheets).`,
        ],
      },
      {
        h: 'Step 2: Make paying easy, in more than one way',
        body: [
          `Every extra step between a customer and the pay button costs you days. Offer the methods your customers actually use:`,
          {
            ul: [
              `**Card**: fast and familiar, and the processor charges its own fee.`,
              `**ACH bank transfer**: usually lower cost for larger invoices, but slower to settle.`,
              `**Cash or check**: still common with residential customers, so record it properly in the field.`,
            ],
          },
          `Zerbiq lets you collect card payments, ACH, or cash. Online card and ACH payments run through your own processor account (Stripe, Square, or Authorize.net). Zerbiq takes no transaction fee and never holds your money; the processor charges its own standard fees directly to you.`,
          `Customers can also pay from the customer portal, which shows service history and invoices after a secure sign-in. Online payments there require a connected payment processor.`,
        ],
      },
      {
        h: 'Step 3: Put your terms in writing',
        body: [
          `A late payment is often a vague payment. Every invoice should show the due date, the accepted payment methods, and what happens if it is late. Keep the wording friendly and plain.`,
          `If you charge late fees, decide the policy once and apply it the same way every time. Zerbiq can apply your late fee policy automatically to overdue invoices on the date you set. Check your local rules on late fees, and when in doubt ask your accountant or attorney.`,
        ],
      },
      {
        h: 'Step 4: Automate reminders',
        body: [
          `Nobody enjoys sending the second email. A reminder schedule takes the awkwardness out:`,
          {
            ol: [
              `A friendly note a few days before the due date.`,
              `A short reminder on the due date.`,
              `A firmer follow-up a few days later.`,
              `A phone call from you after that, for the accounts that matter.`,
            ],
          },
          `Zerbiq reminds customers about overdue invoices automatically, using rules you set once.`,
        ],
      },
      {
        h: 'Step 5: Be flexible where it helps',
        body: [
          `Some customers are good for the money but not all at once. A payment plan or a partial payment is often better than a write-off. Zerbiq supports partial payments and payment plans and tracks the balance automatically, so you are not keeping the math in your head.`,
          `Also decide how you handle credits and refunds. Doing it consistently keeps arguments short.`,
        ],
      },
      {
        h: 'Step 6: Keep the books in sync',
        body: [
          `If you use QuickBooks Online, avoid double entry. Zerbiq connects to QuickBooks Online, brings customers and services over, and syncs invoices and payments back automatically. You do not need QuickBooks to get started, though.`,
          `Whichever system you use, make one place the source of truth for what was billed. The less often anyone retypes an invoice, the fewer mistakes you will chase later.`,
        ],
      },
      {
        h: 'A simple field invoicing checklist',
        body: [
          {
            ul: [
              `Is the job marked complete when the tech leaves?`,
              `Does the invoice go out the same day?`,
              `Can the customer pay in at least two ways?`,
              `Are terms and the due date visible?`,
              `Will an overdue reminder go out without anyone remembering?`,
            ],
          },
          `If you can answer yes to all five, you are ahead of most small service companies. See the [features page](/features) for the invoicing tools by plan, or [book a demo](https://calendly.com/zerbiq-demos/30min) to see invoicing from the field. Taxes on invoices have their own rules; read [sales tax basics for service invoices](/blog/sales-tax-basics-for-service-invoices).`,
        ],
      },
    ],
    faq: [
      {
        q: 'When should I send an invoice for a service job?',
        a: `As soon as the job is complete. Same-day invoicing keeps the work fresh in the customer's mind and shortens the time until you are paid. Recurring customers can be billed once per cycle instead.`,
      },
      {
        q: 'Which payment methods should a field service company accept?',
        a: `Offer card and ACH for online payments and record cash or check when customers prefer them. Having at least two options removes the most common reason an invoice sits unpaid.`,
      },
      {
        q: 'Does Zerbiq charge fees on customer payments?',
        a: `No. Customers pay through your own processor account, and Zerbiq takes no transaction fee. The processor charges its own standard fees to you.`,
      },
      {
        q: 'How do I reduce overdue invoices?',
        a: `Invoice promptly, state due dates clearly, offer easy payment options, and automate reminders. A partial payment or payment plan can recover accounts that would otherwise go unpaid.`,
      },
    ],
    related: [
      'schedule-recurring-service-jobs-without-spreadsheets',
      'sales-tax-basics-for-service-invoices',
      'estimates-and-quotes-that-close',
    ],
  },

  {
    slug: 'technician-on-the-way-notifications',
    title: 'Technician On-the-Way Notifications: What to Send and When',
    metaTitle: 'Technician On-the-Way Notifications: A Guide | Zerbiq',
    description:
      'On-the-way notices cut no-shows and "where are you?" calls. What to include, when to send them, and how to set them up for your crews.',
    category: 'Operations',
    publishedAt: '2026-11-01',
    updatedAt: '2026-11-21',
    answer: `A technician on-the-way notification tells the customer that their tech is headed to the job, with the tech's name, an estimated arrival time, and what the visit covers. Send it when the tech leaves the previous stop. It reduces "where are you?" calls, helps customers be ready, and makes your company look organized.`,
    takeaways: [
      'Send the notice when the tech actually leaves for the job, not in the morning.',
      'Include the tech name, a time estimate, and what the visit will cover.',
      'Pair it with a reminder the day before for fewer missed visits.',
      'Make sending it a one-tap habit, or it will not happen.',
      'Use your own contact details so the customer knows who to call.',
    ],
    sections: [
      {
        h: 'Why on-the-way notices work',
        body: [
          `Most customer calls to a service company boil down to one question: when will you be here? Every one of those calls pulls someone in the office away from dispatching, and every unanswered one makes the customer a little less happy.`,
          `A short message at the right moment answers that question before it is asked. It also gives the customer a chance to open the gate, put the dog inside, or move the car, which saves the tech time on arrival.`,
        ],
      },
      {
        h: 'What a good on-the-way message includes',
        body: [
          `Keep it short and specific. A good notice has four parts:`,
          {
            ol: [
              `**Who**: the tech's name, so the customer knows who to expect.`,
              `**When**: an estimated arrival time or a short window.`,
              `**What**: the service being done, so there are no surprises.`,
              `**Who to call**: your company's phone number or email if plans change.`,
            ],
          },
          `Zerbiq's Technician On The Way feature sends exactly this: one tap sends the customer an automatic notice by email with the tech's name, an estimated arrival time, and a confirmation of what is being done. If you prefer text messages, the optional texting add-on supports that.`,
        ],
      },
      {
        h: 'When to send it',
        body: [
          `Timing matters more than wording. Send the message when the tech leaves the previous stop, not at the start of the day. A morning blast with a four-hour window does not help anyone, and a message sent after the tech has arrived is just noise.`,
          `If you run tightly routed days, estimates will be most accurate when your routes are tight too. Our guide to [building efficient service routes](/blog/how-to-build-efficient-service-routes) explains how to get there.`,
        ],
      },
      {
        h: 'Pair it with reminders before the visit',
        body: [
          `The on-the-way notice is the last message in a chain. The first ones come earlier:`,
          {
            ul: [
              `**A reminder the day before** for appointment-based work, so the customer can confirm or reschedule.`,
              `**An on-the-way notice** when the tech is headed there.`,
              `**A completion message** or invoice after the work is done.`,
            ],
          },
          `Zerbiq emails customers a reminder before each scheduled job, and the optional texting add-on can send them as texts. See the [texting page](/texting) for details.`,
        ],
      },
      {
        h: 'Make it a one-tap habit',
        body: [
          `The best feature in the world fails if techs forget to use it. Two things help. First, make it fast: if sending the notice takes more than a tap, it will be skipped on busy days. Second, make it part of the routine, such as the last thing a tech does before pulling away.`,
          `Track who sends the notice and who does not, and talk about it in the weekly team meeting. A small habit becomes a company standard in a few weeks.`,
        ],
      },
      {
        h: 'Keep your company identity front and center',
        body: [
          `Customers should see your business, not your software vendor. In Zerbiq, everything your customers see carries your own branding and contact details. Upload your logo and set your brand color, and the invoices, estimates, portal, and notifications reflect it.`,
          `That matters for trust. A message that looks like it came from your company, with a number the customer recognizes, is far more likely to be read.`,
        ],
      },
      {
        h: 'Train the whole team, not just the techs',
        body: [
          `Office staff matter here too. If the person answering the phone does not know what a notice says, they cannot answer the follow-up question. Walk everyone through a sample message, show them where to find what was sent, and agree on how to handle a customer who replies.`,
          `A shared script for the three most common replies, running late, can we reschedule, and who is this, keeps your answers consistent.`,
        ],
      },
      {
        h: 'Common mistakes to avoid',
        body: [
          {
            ul: [
              `Sending an arrival time you cannot meet. A window is safer than a single minute.`,
              `Forgetting to say what the visit is. Customers appreciate knowing it is the regular service, not a surprise.`,
              `Messaging too early or too often. One notice per visit is plenty.`,
              `Sending notices without a way to reply or call. Always include a contact.`,
            ],
          },
          `Done well, on-the-way notices are one of the smallest changes with the most visible effect on how customers see you. Pair them with a plan for [review requests and retention](/blog/customer-retention-and-review-requests-for-service-companies) and you have a simple customer-communication system. See what each plan includes on the [pricing page](/pricing), or [book a demo](https://calendly.com/zerbiq-demos/30min).`,
        ],
      },
    ],
    faq: [
      {
        q: 'What is an on-the-way notification?',
        a: `It is a short message sent to the customer when a technician is headed to the job. It usually includes the tech's name, an estimated arrival time, and what the visit covers.`,
      },
      {
        q: 'Should on-the-way notices be texts or emails?',
        a: `Either works. Texts are seen faster, while email is easier to keep as a record. Zerbiq sends on-the-way notices by email, and texts are available with the optional texting add-on.`,
      },
      {
        q: 'When should I send an on-the-way notification?',
        a: `Send it when the technician leaves the previous stop and is actually headed to the customer. Sending it earlier makes the arrival estimate less reliable.`,
      },
      {
        q: 'Do on-the-way notices reduce no-shows?',
        a: `They help customers be ready and give them a chance to say the time no longer works. Combined with a reminder the day before, they make missed visits less likely.`,
      },
    ],
    related: [
      'how-to-build-efficient-service-routes',
      'customer-retention-and-review-requests-for-service-companies',
      'what-a-customer-crm-should-track-for-a-service-business',
    ],
  },
];
