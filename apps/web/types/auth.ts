export interface SignupFormValues {
  email: string
  password: string
}

export interface LoginFromValues {
  email: string
  password: string
}

export interface WebsiteValues {
  name: string
  url: string
}

export interface IWebsite extends WebsiteValues {
  id: number
}
