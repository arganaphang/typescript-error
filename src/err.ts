export default interface Result<Ok, Err> {
  match<O>(x: { Ok: (v: Ok) => O; Err: (v: Err) => O }): O;
}

export const Err = <Ok, Err>(value: Err): Result<Ok, Err> => ({
  match: ({ Err }) => Err(value),
});

export const Ok = <Ok, Err>(value: Ok): Result<Ok, Err> => ({
  match: ({ Ok }) => Ok(value),
});
