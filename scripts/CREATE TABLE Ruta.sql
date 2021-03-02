USE [EWallet]
GO

/****** Object:  Table [dbo].[ruta]    Script Date: 1/3/2021 18:29:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ruta](
	[codigo] [nvarchar](50) NOT NULL,
	[costo] [numeric](5, 0) NOT NULL,
	[descripcion] [nvarchar](500) NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[empresa] [nvarchar](50) NOT NULL,
	[provincia] [nvarchar](25) NOT NULL,
 CONSTRAINT [PK_ruta] PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


