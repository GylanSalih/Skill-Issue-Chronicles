// Type declaration for importing PNG files in TypeScript.
// Without this, TypeScript will throw an error when you try to do:
//   import avatar from "./avatar.png";
//
// This tells TypeScript that any imported `.png` file should be treated as a string,
// representing the final URL after the bundler processes it.
// auto uses in all components ignore this declaration
declare module '*.png' {
  const value: string;
  export default value;
}
