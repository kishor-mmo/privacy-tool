import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const REQoices = [
  {
    Requests: "REQ001",
    paymentStatus: "Unverified",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
  {
    Requests: "REQ002",
    paymentStatus: "Pending",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
  {
    Requests: "REQ003",
    paymentStatus: "Unverified",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
  {
    Requests: "REQ004",
    paymentStatus: "Unverified",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
  {
    Requests: "REQ005",
    paymentStatus: "Completed",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
  {
    Requests: "REQ006",
    paymentStatus: "Pending",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
  {
    Requests: "REQ007",
    paymentStatus: "Unverified",
    Flow: "default",
    Assignee: "default_approver@test.com",
  },
];

export default function DsarRequest() {
  return (
    <div className="flex h-screen">
      {/* <div className="w-1/5 bg-blue-100"> */}
      <div className="w-1/5">
        <Accordion type="single" collapsible className="w-full mt-10 p-5">
          <AccordionItem value="item-1">
            <AccordionTrigger>Requests</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Request List
                </li>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Request Bin
                </li>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Report
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="border-t border-gray-300">
              Intake Form
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Form Store
                </li>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Form Builder
                </li>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Templates
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="border-t border-gray-300">
              Manual Tasks
            </AccordionTrigger>
            <AccordionContent>coming soon</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="border-t border-gray-300">
              Automations
            </AccordionTrigger>
            <AccordionContent>coming soon</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="border-t border-gray-300">
              Flows
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Flow Builder
                </li>
                <li className="p-2 hover:bg-slate-600 cursor-pointer">
                  Form Bin
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <div className="border-t border-gray-300 w-full"></div>
        </Accordion>
      </div>
      {/* <div className="w-4/5 bg-white mt-16"> */}
      <div className="w-4/5  mt-16">
        <Table>
          <TableCaption>All Requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Requests</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Flow</TableHead>
              <TableHead className="text-right">Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REQoices.map((Requests) => (
              <TableRow key={Requests.Requests}>
                <TableCell className="font-medium p-5">
                  {Requests.Requests}
                </TableCell>
                <TableCell>{Requests.paymentStatus}</TableCell>
                <TableCell>{Requests.Flow}</TableCell>
                <TableCell className="text-right">
                  {Requests.Assignee}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Requests</TableCell>
              <TableCell className="text-right">7</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
