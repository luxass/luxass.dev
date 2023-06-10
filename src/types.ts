export type Project = {
  name: string
  owner: string
  description: string
  url: string
  pushedAt: string
  language: {
    color: string
    name: string
  }
};

export type Profile = {
  user: User
};

export type User = {
  repositories: Repositories
};

export type EdgeNode = {
  name: string
  owner: {
    login: string
  }
  description: string | null
  pushedAt: string
  url: string
  languages: Languages
  object: Object | null
};

export type Languages = {
  nodes: LanguageNode[]
};

export type LanguageNode = {
  color: string
  name: string
};

export type Object = {
  entries: Entry[]
};

export type Entry = {
  name: string
  type: EntryType
};

export type EntryType = "blob" | "tree";

export type Repositories = {
  totalCount: number
  nodes: EdgeNode[]
};
