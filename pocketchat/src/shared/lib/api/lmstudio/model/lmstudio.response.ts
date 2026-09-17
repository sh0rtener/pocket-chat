export interface LmStudioResponse {
  // id: string;
  // object: string;
  // created: number;
  // model: string;
  model_intance_id: string;
  output: LmStudioMessageResponse[];
}

export interface LmStudioChoisesResponse {
  index: number;
  message: LmStudioMessageResponse;
}

export interface LmStudioMessageResponse {
  type: string;
  content: string | null;
  data_url: string | null;
}
