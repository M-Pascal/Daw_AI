import Image from "next/image";
import Link from "next/link";
import { LineChart, Radar, RefreshCcw, TrendingUp } from "lucide-react";
import { PublicNav } from "@/components/public-nav";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <Image
            src="/image2.jpg"
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/50 sm:bg-gradient-to-r sm:from-background sm:via-background/85 sm:to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent sm:block hidden" />

          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Intelligent disease surveillance for Kenya&apos;s 8 regions
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                DawAI forecasts HIV, TB, and Malaria case trends across
                Kenya&apos;s eight regions, flags where disease activity is
                rising fastest, and helps health teams spot outbreaks before
                they escalate.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/signup" className={buttonVariants({ size: "lg" })}>
                  Get started
                </Link>
                <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  I already have an account
                </Link>
              </div>
            </div>

            {/* Feature cards */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-2">Case forecasting</CardTitle>
                  <CardDescription>
                    Monthly case-burden forecasts per region and disease,
                    generated from historical patterns with a confidence range.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-2">Regional comparison</CardTitle>
                  <CardDescription>
                    See which of Kenya&apos;s eight regions carry the greatest
                    current disease burden, ranked at a glance.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <RefreshCcw className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-2">Seasonal patterns</CardTitle>
                  <CardDescription>
                    Recurring seasonal peaks and troughs are surfaced per
                    disease, so rising activity doesn&apos;t come as a surprise.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Radar className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-2">Early trend signals</CardTitle>
                  <CardDescription>
                    Regions with a sustained rise in cases are flagged early,
                    instead of relying on retrospective monthly reports.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-forecast">
                  <Radar className="h-4 w-4" />
                  The problem
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Disease data is recorded &mdash; but rarely looked at forward
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Kenya has invested in digital health infrastructure, including
                  the Kenya Health Information System (KHIS2), which records
                  disease data across the country. Yet chronic disease burden
                  continues to shift and surge across all eight regions, and
                  most reporting looks backward at what already happened rather
                  than forward at what&apos;s coming.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Without a forward-looking, region-by-region view, rising
                  disease activity and seasonal outbreaks can go unnoticed until
                  they are already severe &mdash; making it harder for health
                  decision-makers to respond early.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8">
                <dl className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <dt className="text-sm text-muted-foreground">Diseases tracked</dt>
                    <dd className="mt-2 text-3xl font-semibold text-primary">HIV &middot; TB &middot; Malaria</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      Regions monitored across Kenya
                    </dt>
                    <dd className="mt-2 text-3xl font-semibold text-foreground">8 of 8</dd>
                  </div>
                </dl>
                <p className="mt-6 text-xs text-muted-foreground">
                  Scope as defined in the DawAI project proposal.
                </p>
              </div>
            </div>
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
                  who monitor disease burden and respond to outbreaks, who
                  currently rely mostly on retrospective, monthly reporting
                  rather than forward-looking disease forecasts.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background p-8 text-sm text-muted-foreground">
                <p>
                  This system was built by a student research team. Because
                  hospital-level historical datasets are not publicly
                  available, it is demonstrated here using a clearly-labeled
                  synthetic dataset, as
                  described in the project proposal&apos;s methodology. The
                  forecasting approach should be validated with real hospital
                  data in future work.
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
          DawAI &mdash; an intelligent disease surveillance and forecasting system
          for Kenya&apos;s public hospitals.
        </div>
      </footer>
    </div>
  );
}
