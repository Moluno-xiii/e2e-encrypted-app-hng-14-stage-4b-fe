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
    excerpt: "What are you reading tonight?",
    time: "3:42 AM",
    unread: 2,
    online: true,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "Hey, did you see the place I sent yesterday?",
        time: "3:39 AM",
        date: "Today",
      },
      {
        id: "m2",
        fromSelf: true,
        body: "Yeah, looks great. We should book it before the weekend.",
        time: "3:42 AM",
        date: "Today",
      },
      {
        id: "m3",
        fromSelf: false,
        body: "Agreed. I'll handle it tomorrow morning.",
        time: "3:43 AM",
        date: "Today",
      },
      {
        id: "m4",
        fromSelf: false,
        body: "What are you reading tonight?",
        time: "3:44 AM",
        date: "Today",
      },
    ],
  },
  {
    id: "hugo",
    name: "Hugo Vellan",
    excerpt: "Thanks, got it. Talk tomorrow.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m1",
        fromSelf: true,
        body: "Sent you the files. Let me know if anything's missing.",
        time: "9:14 PM",
        date: "Yesterday",
      },
      {
        id: "m2",
        fromSelf: false,
        body: "Thanks, got it. Talk tomorrow.",
        time: "9:30 PM",
        date: "Yesterday",
      },
    ],
  },
  {
    id: "june",
    name: "June Akiyama",
    excerpt: "Same time tomorrow? Bring the book.",
    time: "Mon",
    unread: 0,
    online: true,
    messages: [
      {
        id: "m1",
        fromSelf: true,
        body: "Same time tomorrow? Bring the book.",
        time: "6:02 PM",
        date: "Monday",
      },
    ],
  },
  {
    id: "iris",
    name: "Iris Holm",
    excerpt: "Can you say that again? I want to write it down.",
    time: "Sun",
    unread: 1,
    online: false,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "Can you say that again? I want to write it down.",
        time: "11:08 AM",
        date: "Sunday",
      },
    ],
  },
  {
    id: "noor",
    name: "Noor Adisa",
    excerpt: "Found it, thanks!",
    time: "Apr 28",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m1",
        fromSelf: false,
        body: "Left the spare key in the usual spot.",
        time: "9:41 AM",
        date: "April 28",
      },
      {
        id: "m2",
        fromSelf: true,
        body: "Found it, thanks!",
        time: "10:02 AM",
        date: "April 28",
      },
    ],
  },
];

export const findThread = (id: string | undefined) =>
  threads.find((t) => t.id === id);
