export class apiRoutes {

    private static readonly userBase = 'user';
    public readonly user = {
      list: `${apiRoutes.userBase}/list`,
      get: `${apiRoutes.userBase}/detail`,
      save: `${apiRoutes.userBase}/save`,
      delete: `${apiRoutes.userBase}/delete`,
    };
}

export const ROUTES = new apiRoutes();
