import Hiraganas from "./hiraganas";

type HiraStorageObj = {
    [key: string]: Hiragana;
};

export type Hiragana = {
    url: string;
    name: string;
    hits: number;
    misses: number;
};

export type Question = {
    hira: Hiragana;
    answers: string[];
};

const HIRA_STORAGE_KEY = "HIRAGANAS";

export default class LocalStorageService {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    private get<T>(key: string) {
        const json = this.storage.getItem(key);
        return json ? (JSON.parse(json) as T) : null;
    }

    private set(key: string, value: any) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    clear(): void {
        const storageObject: HiraStorageObj = {};
        for (const hira of Hiraganas) {
            storageObject[hira.name] = hira;
        }
        this.set(HIRA_STORAGE_KEY, storageObject);
    }

    public initalize() {
        if (this.get<HiraStorageObj>(HIRA_STORAGE_KEY)) {
            return;
        }
        this.clear();
    }

    public getStatistics() {
        const hiraganas = this.get<HiraStorageObj>(HIRA_STORAGE_KEY)!;
        const statistics = Object.values(hiraganas)
            .map((h) => ({
                name: h.name,
                url: h.url,
                hits: h.hits,
                misses: h.misses,
                hitRatio: this.hitRatio(h),
            }))
            .sort((a, b) => a.hitRatio - b.hitRatio);
        return statistics;
    }

    public getHiraQuestion(previos?: Question): Question {
        const hiraganas = this.get<HiraStorageObj>(HIRA_STORAGE_KEY)!;
        const hira = this.getWorstHira(hiraganas, previos?.hira);
        const answers = this.getRandomAnswers(hiraganas, hira);

        const question: Question = {
            hira,
            answers,
        };

        question.answers = this.mixAnswers(question);

        return question;
    }

    public isCorrect(answer: string, question: Question) {
        return answer === question.hira.name;
    }

    public processAnswer(answer: string, question: Question) {
        const correct = question.hira.name === answer;
        if (correct) {
            question.hira.hits++;
        } else {
            question.hira.misses++;
        }
        const hiraganas = this.get<HiraStorageObj>(HIRA_STORAGE_KEY)!;
        hiraganas[question.hira.name] = question.hira;
        this.set(HIRA_STORAGE_KEY, hiraganas);
    }

    private hitRatio(h: { hits: number; misses: number }) {
        const total = h.hits + h.misses;
        if (total === 0) {
            return 0;
        }
        return h.hits / total;
    }

    private mixAnswers(question: Question) {
        const radomIndex = Math.floor(Math.random() * question.answers.length);
        const correctAnswer = question.hira.name;
        return [
            ...question.answers.slice(0, radomIndex),
            correctAnswer,
            ...question.answers.slice(radomIndex),
        ];
    }

    private getRandomAnswers(hiraganas: HiraStorageObj, hira: Hiragana) {
        const answers = Object.values(hiraganas).filter(
            (h) => h.name !== hira.name
        );
        const randomIndexes = this.getRandomIndexes(3, answers.length);
        console.log(randomIndexes);
        const randomAnswers = randomIndexes.map((i) => answers[i].name);
        return randomAnswers;
    }

    private getRandomIndexes(howMany: number, arrayLength: number): number[] {
        const arr: number[] = [];
        while (arr.length < howMany) {
            const randomIndex = Math.floor(Math.random() * arrayLength);
            if (!arr.includes(randomIndex)) {
                arr.push(randomIndex);
            }
        }
        return arr;
    }

    private getWorstHira(
        hiraganas: HiraStorageObj,
        previos?: Hiragana
    ): Hiragana {
        const arr: Hiragana[] = [];
        for (const value of Object.values(hiraganas).sort(
            (a, b) => this.hitRatio(a) - this.hitRatio(b)
        )) {
            arr.push(value);
        }

        if (previos) {
            return arr.filter((h) => h.name !== previos.name)[0];
        }

        return arr[0];
    }

    private getRandomHira(hiraganas: HiraStorageObj): Hiragana {
        const arr: Hiragana[] = [];
        for (const value of Object.values(hiraganas)) {
            arr.push(value);
        }

        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}
