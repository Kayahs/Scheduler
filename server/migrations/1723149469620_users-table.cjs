exports.up = pgm => {
//1. Users Table
pgm.sql(`
    CREATE TABLE "scheduler"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT,
      "email" TEXT UNIQUE NOT NULL,
      "password" TEXT NOT NULL
    );
  `)
}
