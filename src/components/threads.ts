export type Message = {
  id: string;
  fromSelf: boolean;
  body: string;
  time: string;
  date: string;
};

export type Thread = {
  id: string;
  name: string;
  fingerprint: string;
  excerpt: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
};

export const threads: Thread[] = [
  {
    id: "ada",
    name: "Ada Mercer",
    fingerprint: "9f8a · 0c43 · e1bd",
    excerpt:
      "I read your last note three times. Tell me again — slowly — what you meant.",
    time: "03:42",
    unread: 2,
    online: true,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "I read your last note three times. Tell me again — slowly — what you meant by the word ‘later’.",
        time: "03:42",
        date: "Today",
      },
      {
        id: "m2",
        fromSelf: true,
        body: "Later as in, after the rain stops. After the city forgets what it was angry about. After we both decide we'd rather not be careful.",
        time: "03:46",
        date: "Today",
      },
      {
        id: "m3",
        fromSelf: false,
        body: "That is a lot of laters for one sentence. I will accept all of them.",
        time: "03:48",
        date: "Today",
      },
      {
        id: "m4",
        fromSelf: false,
        body: "What are you reading tonight?",
        time: "03:49",
        date: "Today",
      },
    ],
  },
  {
    id: "hugo",
    name: "Hugo Vellan",
    fingerprint: "3b4f · 8e2c · 907a",
    excerpt:
      "The package arrived. Thank you for keeping the address quiet, as always.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "The package arrived. Thank you for keeping the address quiet, as always.",
        time: "21:14",
        date: "Yesterday",
      },
      {
        id: "m2",
        fromSelf: true,
        body: "Of course. The post here forgets quickly. Hope it travelled well.",
        time: "21:30",
        date: "Yesterday",
      },
    ],
  },
  {
    id: "june",
    name: "June Akiyama",
    fingerprint: "e7d2 · c1b8 · a93f",
    excerpt:
      "Tomorrow then. Same time. Same line. Bring the book if you remember.",
    time: "Mon",
    unread: 0,
    online: true,
    messages: [
      {
        id: "m1",
        fromSelf: true,
        body: "Tomorrow then. Same time. Same line. Bring the book if you remember.",
        time: "18:02",
        date: "Monday",
      },
    ],
  },
  {
    id: "iris",
    name: "Iris Holm",
    fingerprint: "b1c9 · a8e7 · f203",
    excerpt: "Can you say it again? Slowly. I want to write it down properly.",
    time: "Sun",
    unread: 1,
    online: false,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "Can you say it again? Slowly. I want to write it down properly.",
        time: "11:08",
        date: "Sunday",
      },
    ],
  },
  {
    id: "noor",
    name: "Noor Adisa",
    fingerprint: "4f8a · 7c91 · b3d2",
    excerpt:
      "I left the key under the loose tile. The one we agreed not to talk about.",
    time: "Apr 28",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "I left the key under the loose tile. The one we agreed not to talk about.",
        time: "09:41",
        date: "28 April",
      },
      {
        id: "m2",
        fromSelf: true,
        body: "Found. You're a wonder. The cat watched the whole thing with great suspicion.",
        time: "10:02",
        date: "28 April",
      },
    ],
  },
];

export const findThread = (id: string | undefined) =>
  threads.find((t) => t.id === id);
