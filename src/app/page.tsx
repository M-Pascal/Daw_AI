import Link from "next/link";
import { AlertTriangle, LineChart, MapPinned, ShieldCheck } from "lucide-react";
import { PublicNav } from "@/components/public-nav";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              Carnegie Mellon University Africa &middot; Decision-support prototype
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Forecasting disease trends to end drug shortages and expiry in
              Kenya&apos;s public hospitals
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              DawAI analyzes disease patterns across Kenya&apos;s eight regions and
              forecasts future disease burden, giving health decision-makers
              evidence-based insight for essential drug allocation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                Get started
              </Link>
              <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Log in
              </Link>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-shortage">
                  <AlertTriangle className="h-4 w-4" />
                  The problem
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Medicine worth Ksh 5.3 billion expired in five years &mdash;
                  while other hospitals ran short
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Kenya&apos;s Ministry of Health reports that medicine valued at
                  Ksh 5.3 billion expired between the 2020/2021 and 2024/2025
                  financial years, even as chronic shortages continue to surge
                  across all eight regions. Some hospitals suffer inadequate
                  medicine allocation and stock-outs, while others over-allocate
                  and see stock expire unused.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Kenya has invested in digital health infrastructure &mdash; the
                  Kenya Health Information System (KHIS2) and KEMSA&apos;s
                  Integrated Logistics Management Information System (i-LMIS)
                  &mdash; yet resource allocation is still driven mostly by
                  monthly consumption, which cannot detect changing demand.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8">
                <dl className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Medicine expired (2020/21&ndash;2024/25)
                    </dt>
                    <dd className="mt-2 text-3xl font-semibold text-shortage">
                      Ksh 5.3B
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Regions affected by shortages
                    </dt>
                    <dd className="mt-2 text-3xl font-semibold text-foreground">
                      8 of 8
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs text-muted-foreground">
                  Source: Kenya Ministry of Health study, as cited in the DawAI
                  project proposal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-medium text-primary">The solution</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              An intelligent disease trend analysis and forecasting system
            </h2>
            <p className="mt-4 text-muted-foreground">
              DawAI analyzes patterns and trends of major diseases across
              Kenya&apos;s eight regions, detects seasonal variation, and
              predicts future disease burden &mdash; giving hospital
              decision-makers a dashboard of insight to support evidence-based
              drug allocation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LineChart className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2">Disease pattern &amp; forecasting</CardTitle>
                <CardDescription>
                  Machine learning models identify disease patterns and predict
                  future monthly case burden for HIV, TB, and Malaria.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPinned className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2">Regional outbreak visibility</CardTitle>
                <CardDescription>
                  A Kenya-wide view highlights which of the eight regions carry
                  the greatest current disease burden.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <CardTitle className="mt-2">Evidence-based allocation</CardTitle>
                <CardDescription>
                  Dashboard insights help hospitals move away from
                  consumption-only planning toward demand-aware allocation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-sm font-medium text-primary">Who it&apos;s for</span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Built for Kenya&apos;s public health decision-makers
                </h2>
                <p className="mt-4 text-muted-foreground">
                  DawAI is designed for public hospital and health system staff
                  responsible for essential drug allocation, who currently rely
                  on monthly consumption records rather than demand forecasts to
                  plan supply.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8 text-sm text-muted-foreground">
                <p>
                  This is a research proof-of-concept developed by a student
                  team at Carnegie Mellon University Africa. Because
                  hospital-level historical datasets are not publicly
                  available, the system is demonstrated here using a
                  clearly-labeled synthetic dataset, as described in the
                  project proposal&apos;s methodology. The forecasting approach
                  should be validated with real hospital data in future work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Explore the disease forecast dashboard
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link href="/signup" className={buttonVariants({ size: "lg" })}>
              Create an account
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
              I already have an account
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          DawAI &mdash; an intelligent system for eliminating essential drug expiry
          and shortages in Kenya&apos;s public hospitals.
        </div>
      </footer>
    </div>
  );
}
