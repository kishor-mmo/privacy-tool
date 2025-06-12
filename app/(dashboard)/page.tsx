import { GetFormStats, GetForms } from "@/actions/form";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi"
export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-2xl col-span-2 font-bold">Your Forms</h2>
      <Separator className="my-6" />
      <CreateFormBtn />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={[1, 2, 3, 4].map((el) => (<FormCardSkeleton key={el} />))}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProp {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards(props: StatsCardsProp) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* padding top pt-8 */}
      <StatsCard
        title="totalVisits"
        icon={<LuView />}
        helperText="All time totalVisits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
      // className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="totalSubmission"
        icon={<LuView />}
        helperText="All time totalSubmission"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
      // className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="bounceRate"
        icon={<LuView />}
        helperText="All time bounceRate"
        value={data?.bouncerate.toLocaleString() + "%" || ""}
        loading={loading}
      // className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="averageSubmission"
        icon={<LuView />}
        helperText="All time averageSubmission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
      // className="shadow-md shadow-blue-600"
      />
    </div>
  );
}

export function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="text-2xl font-bold">
        {loading ? (
          <Skeleton>
            <span className="opacity-0">0</span>
          </Skeleton>
        ) : (
          value
        )}
        <p className="text-xs font-medium text-muted-foreground pt-1">
          {helperText}
        </p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />
}

async function FormCards() {
  const forms = await GetForms()
  return <>
    {forms.map(form => (
      <FormCard key={form.id} form={form} />
    ))}
  </>
}

function FormCard({ form }: { form: Form }) {
  return <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-between gap-2">
        <span className="truncate font-bold">{form?.name}</span>
        {form.published && <Badge>Published</Badge>}
        {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
      </CardTitle>
      <CardDescription className="flex items-center justify-between text-sm text-muted-foreground">
        {
          formatDistance(form.createdAt, new Date(), { addSuffix: true })
        }
        {form.published && (
          <span className="flex items-center gap-2">
            <LuView className="text-muted-foreground" />
            <span>{form.visits.toLocaleString()}</span>
            <FaWpforms className="text-muted-foreground" />
            <span>{form.submissions.toLocaleString()}</span>
          </span>
        )}
      </CardDescription>
    </CardHeader>
    <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
      {form.description || "No Description"}
    </CardContent>
    <CardFooter>
      {
        form.published && (
          <Button asChild className="w-full mt-2 text-sm gap-4">
            <Link href={`/forms/${form.id}`}>View Submissions <BiRightArrowAlt /></Link>
          </Button>
        )
      }
      {
        !form.published && (
          <Button asChild variant={"secondary"} className="w-full mt-2 text-sm gap-4">
            <Link href={`/builder/${form.id}`}>Edit Form<FaEdit /></Link>
          </Button>
        )
      }
    </CardFooter>
  </Card>

}