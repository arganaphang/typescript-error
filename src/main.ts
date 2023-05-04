// Reference: https://kkalamarski.me/a-declarative-approach-to-error-handling-in-typescript
// Magic start here
export default interface Result<Ok, Err> {
  match<O>(x: { Ok: (v: Ok) => O; Err: (v: Err) => O }): O;
}

export const Err = <Ok, Err>(value: Err): Result<Ok, Err> => ({
  match: ({ Err }) => Err(value),
});

export const Ok = <Ok, Err>(value: Ok): Result<Ok, Err> => ({
  match: ({ Ok }) => Ok(value),
});
// Magic end here

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

/* stdout
{ name: 'John' }
failed to parse json
*/
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
