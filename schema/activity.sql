CREATE TABLE IF NOT EXISTS  "activity" (
  "id" VARCHAR(128) NOT NULL,
  "name" VARCHAR(128) NOT NULL,
  "type" VARCHAR(128) NOT NULL,
  "activity_date" DATE NOT NULL,
  "points" INTEGER NOT NULL,
  "created_timestamp" TIMESTAMP NOT NULL,
  "updated_timestamp" TIMESTAMP NOT NULL,
  PRIMARY KEY ("id")
);
