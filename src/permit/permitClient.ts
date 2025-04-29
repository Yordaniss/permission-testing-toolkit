import axios from "axios";
const { Permit } = require('permitio');

export interface PermitCheckInput {
  user: string;         // user id or role
  resource: string;     // resource name
  action: string;       // action to test
}

export class PermitClient {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string, apiUrl: string = "https://cloudpdp.api.permit.io") {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async checkPermission(input: PermitCheckInput): Promise<boolean> {
    try {
      const permit = new Permit({
        // in production, you might need to change this url to fit your deployment
        pdp: 'https://cloudpdp.api.permit.io',
        // your api key
        token:
        this.apiKey,
      });

      console.log(input);

      const permitted = await permit.check(input.user, input.action, input.resource);

      return permitted;
    } catch (error) {
      console.error("❌ Error contacting Permit.io:", error);
      return false;
    }
  }
}
