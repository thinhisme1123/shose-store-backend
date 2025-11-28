export class GetMeUseCase {
  async execute(userFromToken: any) {
    return {
      id: userFromToken.id,
      email: userFromToken.email,
      name: userFromToken.name,
    };
  }
}
