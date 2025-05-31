import { generateUUID } from "@/shared/utils/uuidGenerator";
import * as t from "drizzle-orm/pg-core";
import { timestampRows } from "../timestampRows";
import { OrganizerMember } from "./organizerMember";
import { relations } from "drizzle-orm";

export const Organizer = t.pgTable("organizers", {
  id: t
    .varchar()
    .$defaultFn(() => generateUUID())
    .primaryKey()
    .notNull(),
  organizerName: t.varchar().notNull(),
  organizerUsername: t.varchar().unique().notNull(),
  organizerEmail: t.varchar().unique().notNull(),
  organizerContact: t.varchar().unique().notNull(),
  organizerAddress: t.text().notNull(),
  ...timestampRows,
});

export const OrganizerRelationship = relations(Organizer, ({ many }) => ({
  member: many(OrganizerMember),
}));
