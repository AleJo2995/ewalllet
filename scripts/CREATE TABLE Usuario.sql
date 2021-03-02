USE [EWallet]
GO

/****** Object:  Table [dbo].[usuario]    Script Date: 1/3/2021 18:29:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[usuario](
	[cedula] [numeric](9, 0) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[primer_apellido] [nvarchar](50) NOT NULL,
	[segundo_apellido] [nvarchar](50) NOT NULL,
	[correo] [nvarchar](50) NOT NULL,
	[fecha_nacimiento] [datetime2](7) NOT NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED 
(
	[cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


