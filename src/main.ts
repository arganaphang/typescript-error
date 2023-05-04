import Result, { Err, Ok } from "./err";

type User = {
  name: string;
};

const parseJson = (json: string): Result<User, Error> => {
  try {
    const val = JSON.parse(json);
    return Ok(val);
  } catch (error) {
    return Err(error);
  }
};

const user: Result<User, Error> = parseJson('{"name": "John"}');
const user2: Result<User, Error> = parseJson("boom 💥");

[user, user2].map((u) => {
  u.match({
    Ok: (val) => {
      console.log(val);
    },
    Err: (e) => {
      console.log(`${e.name} - ${e.message}`);
    },
  });
});
