import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, varchar, uuid, primaryKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => [index("sessions_userId_idx").on(table.userId)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("accounts_userId_idx").on(table.userId)],
);

export const verifications = pgTable(
  "verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verifications_identifier_idx").on(table.identifier)],
);

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const splitBills = pgTable("split_bills", (t) => ({
  id: t.uuid("id").defaultRandom().primaryKey(),
  name: t.varchar("name").notNull(),
  date: t.timestamp("date").notNull(),
  isDraft: t.boolean('is_draft').default(true).notNull(),
  total: t.numeric("total"),
  totalAdjustments: t.numeric("total_adjustments"),
  grandTotal: t.numeric('grand_total'),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  userId: t.text("user_id")
    .references(() => users.id, { onDelete: "cascade" }),
}));

export const billParticipants = pgTable('bill_participants', (t) => {
  return {
    id: t.uuid("id").defaultRandom().primaryKey(),
    sequenceNumber: t.serial("sequence_number").notNull(),
    name: t.varchar("name").notNull(),
    splitBillId: t.uuid("split_bill_id")
      .notNull()
      .references(() => splitBills.id, { onDelete: "cascade" }),
    totalBill: t.numeric('total_bill'),
    adjustments: t.json('adjustments'),
    totalAdjustments: t.numeric('total_adjustments'),
    finalAmount: t.numeric('final_amount'),
    userId: t.text("user_id")
      .references(() => users.id, { onDelete: "cascade" }),
  }
})

export const billAdjustments = pgTable('bill_adjustments', (t) => {
  return {
    id: t.uuid("id").defaultRandom().primaryKey(),
    sequenceNumber: t.serial("sequence_number").notNull(),
    name: t.varchar("name").notNull(),
    type: t.text('type', { enum: ['additional', 'discount'] }).notNull(),
    valueType: t.text('value_type', { enum: ['percentage', 'nominal'] }).notNull(),
    value: t.numeric("value").notNull(),
    amount: t.numeric("amount").notNull(),
    splitBillId: t.uuid("split_bill_id")
      .notNull()
      .references(() => splitBills.id, { onDelete: "cascade" }),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }
})

export const billItems = pgTable('bill_items', (t) => {
  return {
    id: t.uuid("id").defaultRandom().primaryKey(),
    sequenceNumber: t.serial("sequence_number").notNull(),
    name: t.varchar("name").notNull(),
    price: t.numeric("price").notNull(),
    quantity: t.integer("quantity").notNull(),
    subTotal: t.numeric("sub_total").notNull(),
    discount: t.numeric("discount").default('0').notNull(),
    total: t.numeric("total").notNull(),
    splitBillId: t.uuid("split_bill_id")
      .notNull()
      .references(() => splitBills.id, { onDelete: "cascade" }),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  }
})

export const billItemParticipants = pgTable('bill_item_participants', (t) => {
  return {
    billItemId: t.uuid("bill_item_id")
      .notNull()
      .references(() => billItems.id, { onDelete: "cascade" }),
    billParticipantId: t.uuid("bill_participant_id")
      .notNull()
      .references(() => billParticipants.id, { onDelete: "cascade" }),
    type: t.text('type', { enum: ['quantity', 'percentage', 'nominal'] }).notNull(),
    value: t.numeric("value").notNull(), // for storing quantity, percentage, amount
    total: t.numeric("total").notNull(), // for storing total amount from item
  }
}, (t) => {
  return [
    primaryKey({ columns: [t.billItemId, t.billParticipantId] })
  ]
})

export const splitBillsRelation = relations(splitBills, ({ many }) => ({
  billItems: many(billItems),
  billParticipants: many(billParticipants),
  billAdjustments: many(billAdjustments),
}))

export const billItemsRelation = relations(billItems, ({ one }) => ({
  splitBill: one(splitBills, {
    fields: [billItems.splitBillId],
    references: [splitBills.id],
  }),
}))

export const billParticipantsRelation = relations(billParticipants, ({ one }) => ({
  splitBill: one(splitBills, {
    fields: [billParticipants.splitBillId],
    references: [splitBills.id],
  }),
}))
export const billAdjustmentsRelation = relations(billAdjustments, ({ one }) => ({
  splitBill: one(splitBills, {
    fields: [billAdjustments.splitBillId],
    references: [splitBills.id],
  }),
}))

export const billItemParticipantsRelation = relations(billItemParticipants, ({ one }) => ({
  billItem: one(billItems, {
    fields: [billItemParticipants.billItemId],
    references: [billItems.id],
  }),
  billParticipant: one(billParticipants, {
    fields: [billItemParticipants.billParticipantId],
    references: [billParticipants.id],
  }),
}))