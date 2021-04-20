SELECT [dbo].[rol].[nombre]
  FROM [dbo].[rol]
  INNER JOIN [dbo].[rol_x_usuario]
    ON  [dbo].[rol].[id] = [dbo].[rol_x_usuario].[id_rol]
  INNER JOIN [dbo].[usuario]
    ON  [dbo].[usuario].[cedula] = [dbo].[rol_x_usuario].[cedula]
  WHERE [dbo].[usuario].[cedula] = @cedula