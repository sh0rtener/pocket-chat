export interface LmStudioResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choises: LmStudioChoisesResponse[];
}

export interface LmStudioChoisesResponse {
  index: number;
  message: LmStudioMessageResponse;
}

export interface LmStudioMessageResponse {
  role: string;
  content: string;
}
