"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const user = { name: "testUser", id: "1" };

  if (!user) {
    throw new UserNotFoundError("User not found");
  }

  const stats = prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = (await stats)._sum.visits || 0;
  const submissions = (await stats)._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bouncerate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bouncerate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  // backend validation
  if (!validation.success) {
    throw new Error("Form not valid");
  }
  // console.log("Name on server", data.name);
  // const user = await currentUser() // after auth
  const user = { name: "admin-test", id: "9000" };

  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("Form not created. Something went wrong");
  }

  return form.id;
}

export async function GetForms() {
  const user = { name: "admin-test", id: "9000" }; //Replace after Auth

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormByID(id: number) {
  const user = { name: "admin-test", id: "9000" }; //Replace after Auth

  if (!user) {
    throw new UserNotFoundError();
  }

  return prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = { name: "admin-test", id: "9000" }; //Replace after Auth

  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = { name: "admin-test", id: "9000" }; //Replace after Auth

  if (!user) {
    throw new UserNotFoundError();
  }

  await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: { increment: 1 },
      FormSubmissions: {
        // prisma will handle the relationship since we're creating the formsub inside form object
        // form id of the parent and form submission will be set automatically
        create: {
          content,
        },
      },
    },
    where: {
      shareURL: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: number) {
  const user = { name: "admin-test", id: "9000" }; //Replace after Auth

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}
