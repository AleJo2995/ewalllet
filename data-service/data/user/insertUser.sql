INSERT INTO [dbo].[usuario]
           ([cedula]
           ,[password]
           ,[nombre]
           ,[primer_apellido]
           ,[segundo_apellido]
           ,[correo]
           ,[fecha_nacimiento]
           ,[activo])
     VALUES
           (@cedula
           ,@password
           ,@nombre
           ,@primerApellido
           ,@segundoApellido
           ,@correo
           ,@fechaNacimiento
           ,@activo)