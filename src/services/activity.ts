import pgpClass, { type IDatabase } from "pg-promise";

import { Activity } from "../models/activity";
import { Count } from "../models/pg";

export const getActivities = (db: IDatabase<object>) => {
  console.log("getActivities");

  const query = `
    SELECT *
    FROM activity
  `;

  return db.manyOrNone<Activity>(query, []);
};

export const getActivityById = (db: IDatabase<object>, id: string) => {
  console.log("getActivityById", id);

  const query = `
    SELECT *
    FROM activity
    WHERE id = $1
  `;

  return db.manyOrNone<Activity>(query, [id]);
};

export const getActivitiesCount = (db: IDatabase<object>) => {
  console.log("getActivitiesCount");

  const query = `
    SELECT COUNT(*)
    FROM activity
  `;

  return db.one<Count>(query, []);
};

export const createActivity = (db: IDatabase<object>, data: Activity) => {
  console.log("createActivity");

  const pgp = pgpClass({});
  const insertFields = new pgp.helpers.ColumnSet(data);

  let query = pgp.helpers.insert(data, insertFields, "activity");
  query += ' ON CONFLICT("id") DO UPDATE SET ';
  query += insertFields.assignColumns({
    from: "EXCLUDED",
    skip: ["id"],
  });
  query += " RETURNING *";

  return db.oneOrNone<Activity>(query);
};

export const updateActivity = (
  db: IDatabase<object>,
  id: string,
  data: Partial<Activity>
) => {
  console.log("updateActivity", id);

  const pgp = pgpClass({});
  const updateFields = new pgp.helpers.ColumnSet(data);
  const condition = pgp.as.format(" WHERE id = ${id}", { id });

  let query = String(pgp.helpers.update(data, updateFields, "activity"));
  query += condition;
  query += " RETURNING *";

  return db.oneOrNone<Activity>(query);
};

export const deleteActivity = (db: IDatabase<object>, id: string) => {
  console.log("deleteActivity", id);

  const query = `
    DELETE FROM activity
    WHERE id = $1
    RETURNING *
  `;

  return db.oneOrNone<Activity>(query, [id]);
};
