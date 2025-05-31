import { generateUUID } from "@/shared/utils/uuidGenerator";
import * as t from "drizzle-orm/pg-core";
import { timestampRows } from "../timestampRows";
import { Organizer } from "./organizer";
import { relations } from "drizzle-orm";
import { OrganizerMember } from "./organizerMember";

export const User = t.pgTable("users", {
  id: t
    .varchar()
    .$defaultFn(() => generateUUID())
    .primaryKey()
    .notNull(),
  firstName: t.varchar().notNull(),
  lastName: t.varchar().notNull(),
  email: t.varchar().unique().notNull(),
  username: t.varchar().unique().notNull(),
  password: t.varchar().notNull(),
  phoneNumber: t.integer(),
  verifiedAt: t.timestamp(),
  ...timestampRows,
});

export const UserRelationship = relations(User, ({ many }) => ({
  organizer: many(Organizer),
  member: many(OrganizerMember),
}));
