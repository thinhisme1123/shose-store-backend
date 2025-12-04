export class GetMeUseCase {
  async execute(userFromToken: any) {
    return {
      id: userFromToken.id,
      fullName: userFromToken.fullName,
      email: userFromToken.email,
      name: userFromToken.name,
    };
  }
}
