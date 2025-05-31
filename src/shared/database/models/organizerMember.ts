import { generateUUID } from "@/shared/utils/uuidGenerator";
import * as t from "drizzle-orm/pg-core";
import { Organizer } from "./organizer";
import { User } from "./user";
import { timestampRows } from "../timestampRows";
import { relations } from "drizzle-orm";

export const OrganizerMemberRole = t.pgEnum("organizer_member_role", ["owner", "moderator", "member"]);

export const OrganizerMember = t.pgTable("organizer_members", {
  id: t
    .varchar()
    .$defaultFn(() => generateUUID())
    .primaryKey()
    .notNull(),
  userId: t.varchar().references(() => User.id),
  organizerId: t.varchar().references(() => Organizer.id),
  organizerUserRole: OrganizerMemberRole().default("member"),
  ...timestampRows,
});

export const OrganizerMemberRelationship = relations(OrganizerMember, ({ one }) => ({
  user: one(User, { fields: [OrganizerMember.userId], references: [User.id] }),
  organizer: one(Organizer, { fields: [OrganizerMember.organizerId], references: [Organizer.id] }),
}));
