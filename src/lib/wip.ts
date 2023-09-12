import {
  type PartAnswer,
  type QuestionKind,
  type QuizPart,
  type QuizPartOneOf1Question,
} from "./api";

export enum PartTypeName {
  Content = "Content",
  Question = "Question",
}

export enum QuestionTypeName {
  Bool = "Bool",
}

// TODO: Localize part_defaults
export function part_defaults(
  part_type: PartTypeName,
  question_type?: QuestionTypeName
): QuizPart {
  switch (part_type) {
    case PartTypeName.Content:
      return {
        Content: {
          title: "",
          text: "",
        },
      };
    case PartTypeName.Question:
      return {
        Question: {
          text: "",
          kind: question_defaults(question_type),
        },
      };
    default:
      throw new Error("Unhandled quiz part type!");
  }
}

export function question_defaults(
  question_type?: QuestionTypeName
): QuestionKind {
  switch (question_type) {
    case QuestionTypeName.Bool:
      return {
        Bool: {
          answer: true,
        },
      };
    default:
      throw new Error("Unhandled question type!");
  }
}

export function answer_defaults(source_question: QuestionKind): PartAnswer {
  let fields: any = Object.keys(source_question);
  if (fields.length === 0) {
    throw new Error("Empty source question!");
  }
  let type: QuestionTypeName = fields[0];
  switch (type) {
    case QuestionTypeName.Bool:
      return {
        Bool: {
          answer: true,
        },
      };
    default:
      throw new Error("Unhandled question type!");
  }
}
