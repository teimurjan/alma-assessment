import { NextResponse } from "next/server";
import { AppDataSource } from "@/api/config/database";
import schema from "@/schema/lead-schema.json";
import Container from "typedi";
import { LeadService } from "@/api/services/lead";
import type { CreateLeadDTO } from "@/api/dto/create-lead";
import { createSchemaValidator } from "@/validator/create-schema-validator";
import type { GetLeadsDTO } from "@/api/dto/get-leads-dto";
import { Lead } from "../entities/lead";
import { UserService } from "../services/user";
import { MarkLeadReachedDTO } from "../dto/mark-lead-reached-dto";

const requireUser = async (request: Request) => {
  const cookieHeader = request.headers.get("cookie");
  const cookies = cookieHeader?.split("; ").reduce(
    (acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    },
    {} as Record<string, string>
  );
  const jwt = cookies?.jwt;
  if (!jwt) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to access this resource." },
      { status: 400 }
    );
  }

  const userService = Container.get(UserService);
  const user = await userService.decodeAccessToken(jwt);
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in to access this resource." },
      { status: 400 }
    );
  }
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const validate = createSchemaValidator().compile(schema);
    const isValid = validate(data);
    if (!isValid) {
      return NextResponse.json(
        { error: validate.errors?.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    // Safe casting, as we're validating the data above
    const leadDTO = data as unknown as CreateLeadDTO;
    const leadService = Container.get(LeadService);
    const lead = await leadService.createLead(leadDTO);
    return NextResponse.json({ lead }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const take = parseInt(searchParams.get("take") || "10", 10);
    const status = searchParams.get("status") as Lead["status"] | null;
    const search = searchParams.get("search");

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const requireUserError = await requireUser(request);
    if (requireUserError) {
      return requireUserError;
    }

    const leadsDTO: GetLeadsDTO = { skip, take, status, search };
    const leadService = Container.get(LeadService);
    const leads = await leadService.getAllLeads(leadsDTO);
    return NextResponse.json({ leads }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const requireUserError = await requireUser(request);
    if (requireUserError) {
      return requireUserError;
    }

    const leadDTO = data as MarkLeadReachedDTO;
    const leadService = Container.get(LeadService);
    const lead = await leadService.markReached(leadDTO);
    return NextResponse.json({ lead }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
