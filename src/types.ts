export interface Project {
  name: string
  owner: string
  description: string
  url: string
  pushedAt: string
  language: {
    color: string
    name: string
  }
}

export interface Profile {
  user: User
}

export interface User {
  repositories: Repositories
}

export interface EdgeNode {
  name: string
  owner: {
    login: string
  }
  description: string | null
  pushedAt: string
  url: string
  languages: Languages
  object: Object | null
}

export interface Languages {
  nodes: LanguageNode[]
}

export interface LanguageNode {
  color: string
  name: string
}

export interface Object {
  entries: Entry[]
}

export interface Entry {
  name: string
  type: EntryType
}

export type EntryType = "blob" | "tree";

export interface Repositories {
  totalCount: number
  nodes: EdgeNode[]
}
