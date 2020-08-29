// export let BaseURL = localStorage.getItem('URL');

// TODO: Api Url
export let BaseURL = 'http://localhost:3000';

export const API_URL = BaseURL + '/api';

export class END_POINTS {
  public static baseUrl = BaseURL;
  public static car = API_URL+"/car";
  public static mark = API_URL+"/mark";
  public static auth = API_URL+"/auth";
  public static user = API_URL+"/user";
  
}


