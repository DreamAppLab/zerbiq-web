// Blog posts, part B. Same format as posts-a.mjs.

export const POSTS_B = [
  {
    slug: 'field-service-software-buyers-guide',
    title: 'Field Service Software Buyer\'s Guide: What to Look For',
    metaTitle: 'Field Service Software Buyer\'s Guide | Zerbiq',
    description:
      'Choosing field service software? Use this checklist to judge scheduling, routes, invoicing, mobile apps, pricing, support, and data ownership.',
    category: 'Tools',
    publishedAt: '2026-11-04',
    updatedAt: '2026-11-22',
    answer: `When choosing field service software, look for scheduling and routes that fit how you work, invoicing and payments you control, a simple mobile experience for techs, clear pricing with no surprise per-user fees, and easy data export. Test it with your real jobs during a demo, and ask exactly what each plan includes before you sign.`,
    takeaways: [
      'Start from your own workflow, then check each tool against it.',
      'Ask how pricing grows: per user, per job, or by volume.',
      'Make sure payments go to your own account and your data can leave.',
      'Test the tech experience on a phone, not just the office screen.',
      'Run a real route through any demo before you decide.',
    ],
    sections: [
      {
        h: 'Start with your workflow, not a feature list',
        body: [
          `Feature lists are long and look the same from one vendor to the next. Before you open a single website, write down how a job moves through your company today: a customer is added, a job is scheduled, a tech does the work, an invoice goes out, and money comes in.`,
          `Mark the steps where things go wrong. Missed visits, forgotten invoices, and unclear handoffs are the problems software should fix. That list is your scorecard.`,
        ],
      },
      {
        h: 'The core areas to evaluate',
        body: [
          {
            h3: 'Scheduling and routes',
          },
          `Can you create one-time and recurring jobs, and set weekly, biweekly, monthly, or quarterly patterns? Can you build and reorder routes, and see the day by tech or by route? If you do route work, ask how the system handles holidays and skipped visits.`,
          { h3: 'Invoicing and payments' },
          `Do invoices appear when a job is complete? Can customers pay by card, ACH, or cash? Ask whose payment processor account is used, what the fees are, and whether the software holds your money. With Zerbiq, customers pay through your own processor account (Stripe, Square, or Authorize.net) and Zerbiq takes no transaction fee.`,
          { h3: 'The field experience' },
          `Techs should see their day, the stop details, and a way to log the work, all on a phone. Ask whether there are native apps for iOS and Android, or a browser view. Zerbiq offers both native apps and a team view in any smartphone browser.`,
          { h3: 'Customer records' },
          `A good customer record holds contacts, service history, invoices, notes, and photos in one place. For a deeper list, read [what a customer CRM should track for a service business](/blog/what-a-customer-crm-should-track-for-a-service-business).`,
          { h3: 'Reporting and accounting' },
          `Can you see revenue by route, tech, or service type? Does it connect to your accounting tool? Zerbiq syncs with QuickBooks Online, and you do not need QuickBooks to get started.`,
        ],
      },
      {
        h: 'Pricing: ask how the bill grows',
        body: [
          `Pricing models differ more than features do. Common structures include a price per user, a price per job or visit, and plans based on volume. Each is fair for some businesses and painful for others.`,
          `Ask three questions. What happens to my bill when I hire seasonal workers? What counts toward my plan's limit? What does it cost to add texting, extra storage, or onboarding help? Write down the answers and compare them in a table.`,
          `Zerbiq's pricing is public on the [pricing page](/pricing), including how the weekly completed-visits allowance works and what is included on each plan.`,
        ],
      },
      {
        h: 'Data ownership and getting out',
        body: [
          `Ask what happens to your data if you leave. Can you export customers, jobs, invoices, routes, and team records to CSV or PDF at any time? A vendor that makes export easy is usually confident you will stay on merit.`,
          `Also ask about who owns your branding. Customers should see your logo and contact details on invoices, estimates, and notifications, not a vendor's.`,
        ],
      },
      {
        h: 'Support and onboarding',
        body: [
          `Switching systems is the hard part, not the software itself. Ask what help is offered with importing customers, building routes, and training the team. Find out whether support answers by chat, email, or phone, and how quickly.`,
          `Our [guide to moving from spreadsheets](/blog/move-from-spreadsheets-or-whiteboard-to-field-service-software) covers the practical steps of the switch.`,
        ],
      },
      {
        h: 'A scorecard you can copy',
        body: [
          `Rate each vendor from 1 to 5 on the lines below, then add the totals:`,
          {
            ul: [
              `Recurring jobs and routes match how we work.`,
              `Invoices and online payment fit how we get paid.`,
              `Techs can use it on a phone without training.`,
              `Pricing stays predictable as we grow.`,
              `We can export our data any time.`,
              `Onboarding and support match our team's comfort with software.`,
            ],
          },
          `Weight the lines that match your biggest pain points. If missed invoices cost you the most, weight invoicing double.`,
        ],
      },
      {
        h: 'How to run a good demo',
        body: [
          `Do not watch a generic tour. Bring three real examples: a recurring customer on a route, a one-time job with an estimate, and a customer who pays late. Ask the presenter to walk through each from start to finish.`,
          `Then ask what is not included on the plan you are considering. Honest vendors will tell you. To see how Zerbiq handles your examples, [book a demo](https://calendly.com/zerbiq-demos/30min), or compare plans on the [features page](/features) and [pricing page](/pricing) first.`,
        ],
      },
    ],
    faq: [
      {
        q: 'What features should small field service software include?',
        a: `At minimum: scheduling with recurring jobs, routes, a customer record, invoicing with online payments, and a mobile view for techs. Reporting and accounting sync are the next layer.`,
      },
      {
        q: 'Is per-user pricing a problem for field service companies?',
        a: `It can be, especially with seasonal or growing crews, because each hire changes the bill. Ask what counts toward the price and whether adding office or field staff costs extra.`,
      },
      {
        q: 'How long does it take to switch to field service software?',
        a: `It depends on your data and crew size. A common approach is to import customers, move one route first, run it alongside the old system, then move the rest.`,
      },
      {
        q: 'Should I choose software that integrates with QuickBooks?',
        a: `If you already use QuickBooks Online, yes, since syncing invoices and payments avoids double entry. If you do not use it, it should still work without it.`,
      },
    ],
    related: [
      'move-from-spreadsheets-or-whiteboard-to-field-service-software',
      'what-a-customer-crm-should-track-for-a-service-business',
      'track-technician-time-pay-and-job-costing',
    ],
  },

  {
    slug: 'move-from-spreadsheets-or-whiteboard-to-field-service-software',
    title: 'Moving From Spreadsheets or a Whiteboard to Field Service Software',
    metaTitle: 'Move From Spreadsheets to Field Service Software',
    description:
      'A step-by-step plan to switch from spreadsheets, paper, or a whiteboard to field service software without disrupting routes or billing.',
    category: 'Tools',
    publishedAt: '2026-11-07',
    updatedAt: '2026-11-23',
    answer: `To move from spreadsheets or a whiteboard to field service software, clean your customer list, pick one route to pilot, import or enter its customers and recurring jobs, run it in parallel with your old method for two weeks, then move the remaining routes one at a time. Train your techs on phones before the switch day.`,
    takeaways: [
      'Clean the customer list before importing anything.',
      'Pilot one route, then expand, instead of switching everything at once.',
      'Run old and new side by side for a short, fixed period.',
      'Train techs on their phones, with real stops, before the switch day.',
      'Set a clear date to stop using the old system.',
    ],
    sections: [
      {
        h: 'The signs it is time to switch',
        body: [
          `Spreadsheets and whiteboards work until they do not. You will know it is time when one or more of these happen:`,
          {
            ul: [
              `Someone invoices a job twice, or forgets to invoice it at all.`,
              `Only one person understands the schedule.`,
              `Holidays and rain days mean erasing and rewriting half the week.`,
              `Customers ask where the tech is, and the office has to call to find out.`,
              `You cannot tell which routes or customers make money.`,
            ],
          },
          `None of these means you did anything wrong. They mean the business grew past the tool.`,
        ],
      },
      {
        h: 'Step 1: Clean your customer list first',
        body: [
          `Software is only as good as the data you put in it. Before importing, spend an hour fixing the list:`,
          {
            ol: [
              `Remove duplicates and customers who left long ago.`,
              `Standardize addresses, phone numbers, and email addresses.`,
              `Add the service, frequency, and price for each recurring customer.`,
              `Note gate codes, pets, and special instructions in a notes column.`,
            ],
          },
          `A tidy spreadsheet is the ideal starting point. If you use QuickBooks Online, Zerbiq can bring your customers and services over from it, which saves retyping.`,
        ],
      },
      {
        h: 'Step 2: Define your services and routes',
        body: [
          `Write down the services you sell, how often they repeat, and the routes you run today. This is a good moment to fix what has bothered you for a year: an oddly shaped route, a service nobody understands, a price that has not changed in ages.`,
          `If your routes need a rethink, read our guide to [building efficient service routes](/blog/how-to-build-efficient-service-routes) before you enter them.`,
        ],
      },
      {
        h: 'Step 3: Pilot one route',
        body: [
          `Choose a single route with a manageable number of stops and a tech who is open to trying something new. Enter its customers, recurring jobs, and prices. Build the route, assign it, and push it to the tech's phone.`,
          `Run the pilot in parallel with your current method for about two weeks. Compare: did every visit happen, did every invoice go out, did the tech find the app easy? Fix what you learn, then move on.`,
        ],
      },
      {
        h: 'Step 4: Train the team on phones',
        body: [
          `Techs adopt tools that make their day easier. Show them how to see their route, mark a job complete, and log notes. Keep training short and use real stops from their own route.`,
          `If you pay crews by the job, or track hours, show how that works too, so the new system feels fair from day one. For time and pay tracking, see our [guide to timecards and job costing](/blog/track-technician-time-pay-and-job-costing).`,
        ],
      },
      {
        h: 'Step 5: Switch billing deliberately',
        body: [
          `Billing is the part owners worry about most, and with good reason. Pick a clean cutover date, such as the start of a billing cycle, and bill everything before that date the old way and everything after it in the new system.`,
          `Zerbiq supports billing cycles, so you can set monthly, biweekly, or quarterly cycles and generate one invoice per customer. Learn more in [how to invoice from the field](/blog/invoice-from-the-field-get-paid-faster).`,
        ],
      },
      {
        h: 'Step 6: Set a retirement date for the old system',
        body: [
          `The biggest risk in any migration is living in two systems forever. Choose a date, tell the team, and stick to it. After that date, the old spreadsheet is read-only, kept only for reference.`,
          `Keep a copy of the final spreadsheet, and make sure you can export your new data too. Zerbiq supports exporting customers, jobs, invoices, routes, and team data to CSV or PDF at any time.`,
        ],
      },
      {
        h: 'Common mistakes during the switch',
        body: [
          {
            ul: [
              `Importing a messy list and hoping to clean it later.`,
              `Switching in the busiest week of the season.`,
              `Skipping tech training because the tool looks simple.`,
              `Running two systems with no end date.`,
            ],
          },
          `Pick a calmer stretch of the calendar, keep the pilot small, and you avoid most of these.`,
        ],
      },
      {
        h: 'If you want help',
        body: [
          `Some owners prefer to have someone else do the setup. Zerbiq offers an optional White-Glove Onboarding add-on in which we import your customer list, build your routes, add your team, and configure everything. See the [pricing page](/pricing) for details.`,
          `If you would rather start by looking around, [book a demo](https://calendly.com/zerbiq-demos/30min) and bring a sample of your own customer list.`,
        ],
      },
    ],
    faq: [
      {
        q: 'How long does it take to move from spreadsheets to software?',
        a: `It varies with the size of your customer list and routes. Most companies pilot one route first, run it alongside the old method for a couple of weeks, then migrate the rest.`,
      },
      {
        q: 'Can I import my customer list from a spreadsheet?',
        a: `Many systems accept imports. Clean your list first, with consistent addresses and contact details. Zerbiq can also bring customers over from QuickBooks Online.`,
      },
      {
        q: 'Will my techs struggle with a new system?',
        a: `Techs usually adopt tools that save them time. Keep training short, use their real routes, and let them use their own phones for the team view.`,
      },
      {
        q: 'What if I want to leave the software later?',
        a: `Ask about export before you sign. Zerbiq lets you export customers, jobs, invoices, routes, and team data to CSV or PDF at any time.`,
      },
    ],
    related: [
      'field-service-software-buyers-guide',
      'schedule-recurring-service-jobs-without-spreadsheets',
      'what-a-customer-crm-should-track-for-a-service-business',
    ],
  },

  {
    slug: 'how-to-price-recurring-services',
    title: 'How to Price Recurring Services So Every Route Makes Money',
    metaTitle: 'How to Price Recurring Services for Profit | Zerbiq',
    description:
      'Price weekly, biweekly, and monthly service with a simple cost-plus method: know your cost per visit, add margin, and review prices every year.',
    category: 'Business Tips',
    publishedAt: '2026-11-10',
    updatedAt: '2026-11-24',
    answer: `To price recurring services, work out your cost per visit (labor, drive time, materials, vehicle, and overhead), add the profit margin you need, then adjust for property size, distance, and frequency. Check each price against actual job times, and review prices at least once a year so inflation and rising costs do not erase your margin.`,
    takeaways: [
      'Price from your cost per visit, not from what a competitor charges.',
      'Include drive time, materials, vehicle costs, and overhead.',
      'Charge more for harder properties and longer drives.',
      'Use real job times to check every price.',
      'Raise prices on a schedule and tell customers in advance.',
    ],
    sections: [
      {
        h: 'Why recurring pricing is different',
        body: [
          `A one-time job can be priced to the moment. A recurring job is a promise: the same service, over and over, at a price that has to keep working when fuel goes up, a helper quits, or the property turns out to be harder than it looked.`,
          `The good news is that recurring work is predictable, which makes it easy to price well if you know your numbers. This guide uses illustrative figures only; yours will differ, and you should use your own costs.`,
        ],
      },
      {
        h: 'Step 1: Find your true cost per visit',
        body: [
          `Add up every cost that goes into one visit:`,
          {
            ul: [
              `**Labor**: wages, payroll taxes, and benefits for the time on site.`,
              `**Drive time**: the minutes between stops are paid minutes.`,
              `**Materials**: chemicals, fertilizer, supplies, and consumables.`,
              `**Vehicle and equipment**: fuel, maintenance, insurance, and depreciation.`,
              `**Overhead**: office, software, insurance, licenses, and marketing, spread across visits.`,
            ],
          },
          `As an illustration, imagine a visit with a labor cost of 30 dollars, 8 dollars of materials, 7 dollars of vehicle cost, and 5 dollars of overhead. That visit costs 50 dollars before profit. Your numbers will be different, so measure them.`,
        ],
      },
      {
        h: 'Step 2: Add the margin you need',
        body: [
          `Cost is not price. A price has to cover cost and leave profit for the owner and for the business to grow. Decide on a target margin, then divide your cost by one minus that margin. With the same illustration, a visit costing 50 dollars and a target margin of one-fifth of the price gives a price of about 62.50 dollars.`,
          `Do not skip this step because it feels greedy. A service company with no margin cannot replace trucks, pay for insurance claims, or survive a slow month.`,
        ],
      },
      {
        h: 'Step 3: Adjust for the property',
        body: [
          `Two customers with the same service can cost very different amounts to serve. Adjust for:`,
          {
            ol: [
              `**Size and difficulty**: bigger yards, steep slopes, heavy debris, or hard-to-reach equipment.`,
              `**Distance from the route**: a stop far from your other customers adds drive time.`,
              `**Frequency**: weekly visits usually cost less per visit than visits spread far apart, since there is less to catch up on.`,
              `**Access and extras**: gates, pets, and special requests take time.`,
            ],
          },
          `Route density matters here. Customers clustered together are cheaper to serve than isolated ones. See [how to build efficient service routes](/blog/how-to-build-efficient-service-routes).`,
        ],
      },
      {
        h: 'Step 4: Choose a billing structure',
        body: [
          `Recurring services are often billed one of two ways. A **flat rate** gives the customer one predictable monthly amount. A **per-visit** price bills each completed visit.`,
          `Flat rates are simple for customers and smooth your cash flow, but you need to watch the number of visits you owe. Per-visit pricing tracks your work more closely but makes the bill vary. Pick the one that fits the service, and use billing cycles to automate it. Zerbiq lets you create named billing cycles, such as monthly on the 1st, and generates one invoice per customer at the end of each cycle.`,
        ],
      },
      {
        h: 'Step 5: Check prices against real job times',
        body: [
          `Price assumes a certain time per visit. Reality does not always agree. Review actual time on site for a sample of customers. If a customer you priced for 30 minutes takes 50, the price is wrong, even if the customer is lovely.`,
          `Time tracking makes this easy. Zerbiq's time tracking shows how long every job takes, and its job costing, available on Command plans and above, compares labor and materials to the estimate. Read more in [tracking technician time, pay, and job costing](/blog/track-technician-time-pay-and-job-costing).`,
        ],
      },
      {
        h: 'Step 6: Raise prices on a schedule',
        body: [
          `Costs go up every year. Prices that never move are quietly a pay cut for you. Pick a regular time, such as January or the start of the season, and review every price.`,
          `Tell customers early and plainly: what is changing, by how much, and when. Most reasonable customers accept a modest, well-explained increase. For the ones who do not, your numbers tell you whether keeping them is worth it.`,
        ],
      },
      {
        h: 'A quick pricing checklist',
        body: [
          {
            ul: [
              `Do I know my cost per visit for each service?`,
              `Is there a target margin in every price?`,
              `Have I adjusted for distance and difficulty?`,
              `Do my prices match real job times?`,
              `When did I last raise prices?`,
            ],
          },
          `If you want to see how recurring jobs and billing cycles fit together, [book a demo](https://calendly.com/zerbiq-demos/30min) or compare plans on the [pricing page](/pricing). Tax can change what you show on the invoice; see [sales tax basics for service invoices](/blog/sales-tax-basics-for-service-invoices).`,
        ],
      },
    ],
    faq: [
      {
        q: 'How do I calculate the price of a recurring service?',
        a: `Add up labor, drive time, materials, vehicle costs, and overhead for one visit, then add your target profit margin. Adjust for property size, distance, and frequency.`,
      },
      {
        q: 'Should I charge a flat monthly rate or per visit?',
        a: `Flat rates are predictable for customers and smooth your cash flow. Per-visit billing follows your work more closely. Choose based on how consistent the service is.`,
      },
      {
        q: 'How often should I raise prices on recurring customers?',
        a: `Review prices at least once a year, and give customers notice that explains the change. Regular small increases are easier to accept than rare large ones.`,
      },
      {
        q: 'How do I know if a customer is unprofitable?',
        a: `Compare the actual time and materials for their visits to the price you charge. If the work consistently takes longer than your price assumes, adjust the price or the service.`,
      },
    ],
    related: [
      'how-to-build-efficient-service-routes',
      'track-technician-time-pay-and-job-costing',
      'estimates-and-quotes-that-close',
    ],
  },

  {
    slug: 'customer-retention-and-review-requests-for-service-companies',
    title: 'Customer Retention and Review Requests for Service Companies',
    metaTitle: 'Customer Retention and Review Requests | Zerbiq',
    description:
      'Keep more recurring customers and earn more reviews with simple habits: reliable visits, clear messages, follow-up, and a review request after each job.',
    category: 'Growth',
    publishedAt: '2026-11-13',
    updatedAt: '2026-11-24',
    answer: `Service companies keep customers by showing up when promised, communicating clearly, fixing problems fast, and following up after the work. Ask for a review right after a job goes well, by email or text, with a direct link. Make it automatic so every happy customer gets asked, not just the ones you remember.`,
    takeaways: [
      'Retention is mostly reliability and communication, not discounts.',
      'Ask for reviews right after a good visit, while it is fresh.',
      'Automate the request so it happens every time.',
      'Respond to every review, good or bad, in a calm and helpful tone.',
      'Follow up with customers who go quiet before they leave.',
    ],
    sections: [
      {
        h: 'Retention is cheaper than winning new customers',
        body: [
          `For a company that lives on recurring work, every customer who stays is revenue you do not have to buy again. Marketing, estimates, and onboarding a new customer all cost time and money, and a long-time customer is already on your route.`,
          `Reviews matter for the opposite reason: they bring in the next customers. Many people read reviews before they hire a local service company. Retention and reviews are two sides of the same habit: do the work well, and make it easy for people to say so.`,
        ],
      },
      {
        h: 'Why customers leave',
        body: [
          `Customers rarely leave over a single bad visit. More often they drift away because of small things:`,
          {
            ul: [
              `A missed or late visit that nobody explained.`,
              `An invoice that was wrong or confusing.`,
              `No one answering a message for days.`,
              `A different crew every week who did not know the property.`,
              `A price increase with no warning.`,
            ],
          },
          `Every item on that list is fixable with process. Reliable routes, clear messages, and consistent crews do more for retention than any discount.`,
        ],
      },
      {
        h: 'Build a simple communication rhythm',
        body: [
          `Customers feel taken care of when they hear from you at the right moments. A basic rhythm looks like this:`,
          {
            ol: [
              `A reminder before a scheduled visit.`,
              `An on-the-way notice when the tech is headed there. See [technician on-the-way notifications](/blog/technician-on-the-way-notifications).`,
              `A clear, correct invoice.`,
              `A check-in or review request after the work.`,
            ],
          },
          `Zerbiq automates several of these. It emails appointment reminders, sends on-the-way notices, and can send automated review requests after a job is completed. Texting is available as an optional add-on. See the [features page](/features) for details by plan.`,
        ],
      },
      {
        h: 'How to ask for reviews',
        body: [
          `Most happy customers never leave a review, not because they dislike you, but because nobody asked. A good request is:`,
          {
            ul: [
              `**Timely**: sent soon after a completed job.`,
              `**Short**: one or two sentences.`,
              `**Direct**: a single link to the review page, with no extra steps.`,
              `**Honest**: never offering money for a good review, and never filtering out unhappy customers in a way that breaks a review site's rules.`,
            ],
          },
          `Check the rules of the review platform you use; they differ and change over time. Zerbiq's review request automation sends a request by email after a job is completed, or by text with the optional texting add-on.`,
        ],
      },
      {
        h: 'Reply to every review',
        body: [
          `A reply is read by the next customer more than by the reviewer. For good reviews, thank the person and mention something specific. For a bad one, stay calm: acknowledge the problem, say what you are doing about it, and invite them to contact you directly.`,
          `Never argue in public. A thoughtful reply to a bad review can earn more trust than a page of five-star ratings.`,
        ],
      },
      {
        h: 'Follow up before customers drift',
        body: [
          `Watch for quiet signals: skipped visits, late payments, a message that went unanswered. A short personal check-in often saves the account.`,
          `Automated follow-up helps too. Zerbiq's follow-up sequences, available on Command plans and above, send a series of messages to leads and inactive customers so you stay top of mind without manual effort. Check the [pricing page](/pricing) for what each plan includes.`,
        ],
      },
      {
        h: 'Track retention so you can improve it',
        body: [
          `You cannot improve what you do not measure. Pick a few simple numbers: how many customers started this season, how many left, and the reasons they gave. Zerbiq's reports include customer retention rates and overdue invoice aging, so those numbers are not buried in a spreadsheet.`,
          `Keep notes on every customer so anyone in the office can pick up a conversation. We list what to record in [what a customer CRM should track](/blog/what-a-customer-crm-should-track-for-a-service-business).`,
        ],
      },
      {
        h: 'Make it a team habit',
        body: [
          `Retention is not one person's job. Techs shape it every visit, the office shapes it every call, and the owner shapes it with every price and policy. Review a handful of customer records together each month and ask what you would do differently. Small changes add up over a season.`,
        ],
      },
      {
        h: 'A retention and review checklist',
        body: [
          {
            ul: [
              `Does every customer get a reminder and an on-the-way notice?`,
              `Is every invoice correct and easy to understand?`,
              `Does a review request go out after every completed job?`,
              `Does someone answer every review within a few days?`,
              `Does someone check in with customers who go quiet?`,
            ],
          },
          `If you want these running without remembering them, [book a demo](https://calendly.com/zerbiq-demos/30min) and see how the automations are set up.`,
        ],
      },
    ],
    faq: [
      {
        q: 'When should I ask a customer for a review?',
        a: `Soon after a completed job that went well, while the experience is fresh. Include a direct link so leaving a review takes seconds.`,
      },
      {
        q: 'Can I automate review requests?',
        a: `Yes. Zerbiq sends a review request by email after a job is completed, and by text if you add the optional texting add-on.`,
      },
      {
        q: 'How do I reduce customer churn in a recurring service business?',
        a: `Be reliable, communicate before and after visits, send accurate invoices, and check in with customers who show signs of drifting. Consistent crews also help.`,
      },
      {
        q: 'Should I respond to negative reviews?',
        a: `Yes, calmly and promptly. Acknowledge the issue, explain what you are doing, and invite them to contact you directly. Future customers read the reply too.`,
      },
    ],
    related: [
      'technician-on-the-way-notifications',
      'what-a-customer-crm-should-track-for-a-service-business',
      'estimates-and-quotes-that-close',
    ],
  },
];
