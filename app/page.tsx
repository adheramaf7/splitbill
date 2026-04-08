import { GettingStartedButton } from "@/components/getting-started-button"
import { GoogleIcon } from "@/components/google-icon"
import { GoogleSignIn } from "@/components/google-sign-in"
import { InitialLogo } from "@/components/initial-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowRight,
  Check,
  Users,
  Zap,
  ReceiptText,
  Wallet,
  ChevronRightIcon,
  MenuIcon,
} from "lucide-react"

const APP_NAME = process.env.APP_NAME || "APP_NAME"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <InitialLogo />
          <ul className="hidden flex-row gap-6 text-sm font-medium md:flex">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#use-cases">Use Cases</a>
            </li>
          </ul>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:hidden" size={"icon-lg"}>
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <a href="#features">Features</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#how-it-works">How It Works</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#use-cases">Use Cases</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl leading-tight font-bold text-balance text-slate-900 md:text-5xl lg:text-6xl">
              Split bills the fair way. No awkward moments.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              {APP_NAME} helps you split shared expenses accurately—even with
              discounts, taxes, and mixed portions.
            </p>
            <div className="flex flex-row gap-4 pt-4">
              <GoogleSignIn />
              <a href="#how-it-works">
                <Button size="xl" variant="outline" type="button">
                  See How It Works <ChevronRightIcon className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary/50 shadow-2xl md:h-80">
              <div className="bg-grid-pattern absolute inset-0 opacity-20"></div>
              <div className="relative z-10 text-center">
                <Wallet className="mx-auto mb-4 h-24 w-24 text-primary-foreground" />
                <p className="font-semibold text-primary-foreground">
                  Smart Bill Splitting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="hidden items-center justify-center md:flex">
            <div className="relative flex h-64 w-full items-center justify-center rounded-3xl bg-linear-to-br from-red-50 to-orange-50 shadow-lg md:h-80">
              <div className="text-center">
                <div className="mb-4 text-6xl">😕</div>
                <p className="font-semibold text-slate-700">Messy Math</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Splitting bills shouldn&apos;t be this hard
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Whether it&apos;s a restaurant bill with tax and tip, a trip where
              people ordered different things, or shared household
              expenses—calculating who owes what becomes a headache.
              Spreadsheets break down. Calculators are tedious. And someone
              always gets short-changed.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              That awkward conversation? We&apos;ll help you skip it entirely.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="mx-auto max-w-6xl rounded-3xl bg-linear-to-b from-transparent to-primary/30 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {APP_NAME} does the math for you
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Just input items and assign people. We handle the complex
            calculations—taxes, discounts, and everything in between.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              number: "1",
              title: "Add Items",
              desc: "List what was purchased and the total cost",
            },
            {
              number: "2",
              title: "Assign People",
              desc: "Choose who had what and how much",
            },
            {
              number: "3",
              title: "Get Result",
              desc: "Instant fair settlement amounts",
            },
          ].map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
        id="features"
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Built for fairness
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: ReceiptText,
              title: "Smart Item Splitting",
              desc: `Split by quantity, percentage, or exact amounts. ${APP_NAME} adapts to your needs.`,
            },
            {
              icon: Check,
              title: "Fair Calculations",
              desc: "Discounts and fees are distributed proportionally. No one gets short-changed.",
            },
            {
              icon: Zap,
              title: "Fast & Effortless",
              desc: "No spreadsheets. No calculators. No confusion. Just clarity.",
            },
            {
              icon: Users,
              title: "Built for Groups",
              desc: "Works for friends, teams, travel groups, roommates, and more.",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="border-slate-200 p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          How it works
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { step: "1", title: "Add your bill", icon: "📱" },
            { step: "2", title: "Assign items", icon: "✏️" },
            { step: "3", title: "Add adjustments", icon: "🔧" },
            { step: "4", title: "Get the result", icon: "✅" },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="text-center">
                <div className="mb-4 text-5xl">{item.icon}</div>
                <p className="mb-2 font-semibold text-slate-900">
                  Step {item.step}
                </p>
                <p className="text-slate-600">{item.title}</p>
              </div>
              {idx < 3 && (
                <div className="absolute top-12 right-0 hidden translate-x-full transform md:block">
                  <ArrowRight className="h-6 w-6 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="mx-auto max-w-6xl rounded-3xl bg-linear-to-r from-primary to-blue-600 px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Fair, simple, and completely free
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary">
            No subscriptions. No hidden fees. No limits. {APP_NAME} is free
            forever because fair splits shouldn&apos;t cost money.
          </p>
          <div className="text-6xl font-bold">FREE</div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
        id="use-cases"
      >
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Perfect for every occasion
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              emoji: "🍽️",
              title: "Dining Out",
              desc: "With friends, family, or coworkers",
            },
            {
              emoji: "✈️",
              title: "Traveling",
              desc: "In groups, road trips, and vacations",
            },
            {
              emoji: "☕",
              title: "Office Runs",
              desc: "Coffee, lunch, and group orders",
            },
            {
              emoji: "🏠",
              title: "Shared Expenses",
              desc: "Roommates, utilities, and household",
            },
          ].map((useCase, idx) => (
            <div
              key={idx}
              className="rounded-md border-[0.5px] border-slate-200 p-6 text-center transition-all hover:border-green-300 hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{useCase.emoji}</div>
              <h3 className="mb-2 font-semibold text-slate-900">
                {useCase.title}
              </h3>
              <p className="text-sm text-slate-600">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section
        id="cta"
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8"
      >
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Ready to split smarter?
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Start using {APP_NAME} today—free forever.
        </p>
        <GettingStartedButton />
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <div className="mb-2">
                <InitialLogo />
              </div>
              <p className="text-slate-600">Fair splits, zero hassle.</p>
            </div>
            <div className="flex gap-6">
              {/* <a
                href="#"
                className="text-slate-600 transition-colors hover:text-slate-900"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-600 transition-colors hover:text-slate-900"
              >
                Terms
              </a> */}
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>
              © {new Date().getFullYear()} {APP_NAME}. Made with care for fair
              splits everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
