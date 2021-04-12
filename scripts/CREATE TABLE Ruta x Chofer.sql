USE [EWallet]
GO

/****** Object:  Table [dbo].[ruta_x_chofer]    Script Date: 6/4/2021 21:31:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ruta_x_chofer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo_ruta] [nvarchar](50) NOT NULL,
	[cedula] [numeric](9, 0) NOT NULL,
 CONSTRAINT [PK_ruta_x_chofer_1] PRIMARY KEY CLUSTERED 
(
	[codigo_ruta] ASC,
	[cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ruta_x_chofer]  WITH CHECK ADD  CONSTRAINT [FK_ruta_x_chofer_ruta_x_chofer] FOREIGN KEY([codigo_ruta])
REFERENCES [dbo].[ruta] ([codigo])
GO

ALTER TABLE [dbo].[ruta_x_chofer] CHECK CONSTRAINT [FK_ruta_x_chofer_ruta_x_chofer]
GO

ALTER TABLE [dbo].[ruta_x_chofer]  WITH CHECK ADD  CONSTRAINT [FK_ruta_x_chofer_usuario] FOREIGN KEY([cedula])
REFERENCES [dbo].[usuario] ([cedula])
GO

ALTER TABLE [dbo].[ruta_x_chofer] CHECK CONSTRAINT [FK_ruta_x_chofer_usuario]
GO


