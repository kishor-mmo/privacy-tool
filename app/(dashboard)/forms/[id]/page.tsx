import { GetFormByID, GetFormWithSubmissions } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import React, { ReactNode } from "react";
import { StatsCard } from "../../page";
import { LuView } from "react-icons/lu";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";

async function FormDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormByID(Number(id));
  if (!form) {
    throw new Error("form not found");
  }
  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bouncerate = 100 - submissionRate;

  return (
    <>
      <div className="border-b py-10 border-muted">
        <div className="flex justify-between container">
          <h1 className="truncate text-2xl font-bold">{form.name}</h1>
          <VisitBtn shareURL={form.shareURL} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container flex items-center justify-center gap-2">
          <FormLinkShare shareURL={form.shareURL} />
        </div>
      </div>

      <div className="container w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="totalVisits"
          icon={<LuView />}
          helperText="All time totalVisits"
          value={visits.toLocaleString() || ""}
          loading={false}
          // className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="totalSubmission"
          icon={<LuView />}
          helperText="All time totalSubmission"
          value={submissions.toLocaleString() || ""}
          loading={false}
          // className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="bounceRate"
          icon={<LuView />}
          helperText="All time bounceRate"
          value={bouncerate.toLocaleString() + "%" || ""}
          loading={false}
          // className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="averageSubmission"
          icon={<LuView />}
          helperText="All time averageSubmission"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          // className="shadow-md shadow-blue-600"
        />
      </div>
      <div className="container pt-20">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;

type Row = { [key: string]: string } & { submittedAt: Date };

// export removed
async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);
  if (!form) {
    throw new Error("Form not found");
  }
  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextArea":
      case "DateField":
      case "SelectField":
      case "CheckBoxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });
  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({ ...content, submittedAt: submission.createdAt });
  });
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-right uppercase text-muted-foreground">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell // to support multiple type of fields
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  const node: ReactNode = value;
  switch (type) {
    case "DateField":
      
  }
  return <TableCell>{node}</TableCell>;
}
