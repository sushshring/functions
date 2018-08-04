import { Request }     from 'express';
import { GithubEvent } from './GithubEvent';
import { RequestData } from '../RequestData';

export class GithubRequestData implements RequestData {
  signature: string;
  event: GithubEvent;
  data: any;

  constructor(signature: string, event: GithubEvent, data: any) {
    this.signature = signature;
    this.event     = event;
    this.data      = data;
  }

  private static parseGithubEvent(event: string): GithubEvent {
    switch (event) {
      default:
        return GithubEvent.PULL_REQUEST;
    }
  }

  public static parseFromHttp(request: Request) {
    const signature = request.headers['x-hub-signature'];
    if (!signature) {
      throw new HttpError('Signature not provided', 401);
    }
    const event = request.headers['x-github-event'];
    if (!event) {
      throw new HttpError('Event not provided', 401);
    }
    return new GithubRequestData(signature.toString(),
                                 GithubRequestData.parseGithubEvent(event.toString()),
                                 request.body);
  }
}
