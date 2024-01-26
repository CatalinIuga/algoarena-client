// @ts-expect-error
const ids = [
  {
    id: 45,
    name: "Assembly (NASM 2.14.02)",
  },
  {
    id: 46,
    name: "Bash (5.0.0)",
  },
  {
    id: 47,
    name: "Basic (FBC 1.07.1)",
  },
  {
    id: 75,
    name: "C (Clang 7.0.1)",
  },
  {
    id: 76,
    name: "C++ (Clang 7.0.1)",
  },
  {
    id: 48,
    name: "C (GCC 7.4.0)",
  },
  {
    id: 52,
    name: "C++ (GCC 7.4.0)",
  },
  {
    id: 49,
    name: "C (GCC 8.3.0)",
  },
  {
    id: 53,
    name: "C++ (GCC 8.3.0)",
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
  },
  {
    id: 86,
    name: "Clojure (1.10.1)",
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
  },
  {
    id: 77,
    name: "COBOL (GnuCOBOL 2.2)",
  },
  {
    id: 55,
    name: "Common Lisp (SBCL 2.0.0)",
  },
  {
    id: 90,
    name: "Dart (2.19.2)",
  },
  {
    id: 56,
    name: "D (DMD 2.089.1)",
  },
  {
    id: 57,
    name: "Elixir (1.9.4)",
  },
  {
    id: 58,
    name: "Erlang (OTP 22.2)",
  },
  {
    id: 44,
    name: "Executable",
  },
  {
    id: 87,
    name: "F# (.NET Core SDK 3.1.202)",
  },
  {
    id: 59,
    name: "Fortran (GFortran 9.2.0)",
  },
  {
    id: 60,
    name: "Go (1.13.5)",
  },
  {
    id: 95,
    name: "Go (1.18.5)",
  },
  {
    id: 88,
    name: "Groovy (3.0.3)",
  },
  {
    id: 61,
    name: "Haskell (GHC 8.8.1)",
  },
  {
    id: 91,
    name: "Java (JDK 17.0.6)",
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
  },
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
  },
  {
    id: 93,
    name: "JavaScript (Node.js 18.15.0)",
  },
  {
    id: 78,
    name: "Kotlin (1.3.70)",
  },
  {
    id: 64,
    name: "Lua (5.3.5)",
  },
  {
    id: 89,
    name: "Multi-file program",
  },
  {
    id: 79,
    name: "Objective-C (Clang 7.0.1)",
  },
  {
    id: 65,
    name: "OCaml (4.09.0)",
  },
  {
    id: 66,
    name: "Octave (5.1.0)",
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
  },
  {
    id: 85,
    name: "Perl (5.28.1)",
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
  },
  {
    id: 43,
    name: "Plain Text",
  },
  {
    id: 69,
    name: "Prolog (GNU Prolog 1.4.5)",
  },
  {
    id: 70,
    name: "Python (2.7.17)",
  },
  {
    id: 92,
    name: "Python (3.11.2)",
  },
  {
    id: 71,
    name: "Python (3.8.1)",
  },
  {
    id: 80,
    name: "R (4.0.0)",
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
  },
  {
    id: 73,
    name: "Rust (1.40.0)",
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
  },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
  },
  {
    id: 94,
    name: "TypeScript (5.0.3)",
  },
  {
    id: 84,
    name: "Visual Basic.Net (vbnc 0.0.0.5943)",
  },
];

import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { csharp } from "@replit/codemirror-lang-csharp";

// C++: 52
// C: 48
// C#: 51
// Java: 62
// Python: 70
// Python3: 71
// Javascript: 63
// Typescript: 74
// PHP: 68
// Swift: 83
// Go: 60
// Ruby: 72
// Rust: 73
// -> could add more maybe
export const languages: {
  [key: string]: {
    id: number;
    name: string;
    color: string; // tailwind css base color
    extension: () => LanguageSupport | StreamLanguage<any>;
    code: string;
  };
} = {
  "C++": {
    id: 52,
    name: "C++ (GCC 7.4.0)",
    extension: cpp,
    color: "text-pink-500",
    code: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}`,
  },
  C: {
    id: 48,
    name: "C (GCC 7.4.0)",
    extension: cpp,
    color: "text-blue-500",
    code: `#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}`,
  },
  "C#": {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    extension: csharp,
    color: "text-purple-500",
    code: `using System;

public class Program
{

  public static void Main()
  {
    Console.WriteLine("Hello World");
  }
}`,
  },
  Java: {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    extension: java,
    color: "text-red-500",
    code: `class Main {
  public static void main(String[] args) {
    System.out.println("Hello world!");
  }
}`,
  },
  Python: {
    id: 70,
    name: "Python (2.7.17)",
    extension: python,
    color: "text-cyan-500",
    code: `print "Hello World"`,
  },
  Python3: {
    id: 71,
    name: "Python (3.8.1)",
    extension: python,
    color: "text-green-500",
    code: `print("Hello World")`,
  },
  Javascript: {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    extension: javascript,
    color: "text-yellow-500",
    code: `console.log("Hello World")`,
  },
  Typescript: {
    id: 74,
    name: "TypeScript (3.7.4)",
    color: "text-blue-500",
    extension: () => javascript({ typescript: true }),
    code: `console.log("Hello World")`,
  },
  PHP: {
    id: 68,
    name: "PHP (7.4.1)",
    extension: php,
    color: "text-indigo-500",
    code: `<?php
echo "Hello World";
?>`,
  },
  Swift: {
    id: 83,
    name: "Swift (5.2.3)",
    color: "text-orange-500",
    extension: () => StreamLanguage.define(swift),
    code: `print("Hello World")`,
  },

  Go: {
    id: 60,
    name: "Go (1.13.5)",
    color: "text-cyan-500",
    extension: () => StreamLanguage.define(go),
    code: `package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}`,
  },

  Ruby: {
    id: 72,
    name: "Ruby (2.7.0)",
    color: "text-red-500",
    extension: () => StreamLanguage.define(ruby),
    code: `puts "Hello World"`,
  },

  Rust: {
    id: 73,
    name: "Rust (1.40.0)",
    extension: rust,
    color: "text-orange-500",
    code: `fn main() {
    println!("Hello World");
}`,
  },
};
