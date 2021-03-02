USE [EWallet]
GO

/****** Object:  Table [dbo].[monedero]    Script Date: 1/3/2021 18:27:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[monedero](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[numero_tarjeta] [int] NOT NULL,
	[nombre_tarjeta_habiente] [nvarchar](50) NOT NULL,
	[caducidad] [nvarchar](50) NOT NULL,
	[cvv] [nvarchar](10) NOT NULL,
	[cedula] [numeric](9, 0) NOT NULL,
	[saldo] [int] NOT NULL,
 CONSTRAINT [PK_monedero] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[monedero]  WITH CHECK ADD  CONSTRAINT [FK_Mondero_Usuario] FOREIGN KEY([id])
REFERENCES [dbo].[monedero] ([id])
GO

ALTER TABLE [dbo].[monedero] CHECK CONSTRAINT [FK_Mondero_Usuario]
GO


