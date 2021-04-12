USE [EWallet]
GO

/****** Object:  Table [dbo].[rol_x_usuario]    Script Date: 6/4/2021 21:30:13 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[rol_x_usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_rol] [int] NOT NULL,
	[cedula] [numeric](9, 0) NOT NULL,
 CONSTRAINT [PK_rol_x_usuario_1] PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC,
	[cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[rol_x_usuario]  WITH CHECK ADD  CONSTRAINT [FK_rol_x_usuario_rol] FOREIGN KEY([id_rol])
REFERENCES [dbo].[rol] ([id])
GO

ALTER TABLE [dbo].[rol_x_usuario] CHECK CONSTRAINT [FK_rol_x_usuario_rol]
GO

ALTER TABLE [dbo].[rol_x_usuario]  WITH CHECK ADD  CONSTRAINT [FK_rol_x_usuario_usuario] FOREIGN KEY([cedula])
REFERENCES [dbo].[usuario] ([cedula])
GO

ALTER TABLE [dbo].[rol_x_usuario] CHECK CONSTRAINT [FK_rol_x_usuario_usuario]
GO


