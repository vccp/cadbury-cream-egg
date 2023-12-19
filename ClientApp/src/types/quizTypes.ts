interface Matrix {
    [key: string]: {
        result: string;
        type: string;
        personalityLine: string;
        '4xTraits': string[];
        '2xReccomandations': string[];
    };
}

export interface QuizOption  {
    code?: string;
    option: string;
}

export interface QuizItem {
    options: QuizOption[];
    id: number;
    question: string;
    layout: string;
    divider?: boolean;
    image?: string;
    multi_select: boolean;
}

export interface QuizResponse {
    quizData: QuizItem[];
    matrix: Matrix;
}

export interface Answer {
    questionId: number;
    answer: QuizOption  | QuizOption[] | null;
}
