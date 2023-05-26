
export type FormValues = {
  welcomeMessage: string
  chatBackgroundColor: string
  suggestionMessage: string
  displayName: string
  userColorMessage: string
  chatBotColorMessage: string
  chatBubbleColor: string
  chatBubbleAlignment: string
}

export interface IchatbotInterfaceForm {
  data: FormValues
}

export interface FormValuesWithID extends FormValues {
  map(arg0: (chatbot: any) => void): unknown
  id: string
}
