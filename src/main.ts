import Result, { Err, Ok } from "./err";

type User = {
  name: string;
};

const parseJson = (json: string): Result<User, string> => {
  try {
    const val = JSON.parse(json);
    return Ok(val);
  } catch (_error) {
    return Err("failed to parse json");
  }
};

const user: Result<User, string> = parseJson('{"name": "John"}');
const user2: Result<User, string> = parseJson("boom 💥");

[user, user2].map((u) => {
  u.match({
    // ? val: User
    Ok: (val) => {
      console.log(val);
    },
    // ? e: string
    Err: (e) => {
      console.log(e);
    },
  });
});
