SELECT [cedula]
      ,[password]
      ,[nombre]
      ,[primer_apellido]
      ,[segundo_apellido]
      ,[correo]
      ,[fecha_nacimiento]
      ,[activo]
  FROM [dbo].[usuario]
  WHERE [cedula]=@userId