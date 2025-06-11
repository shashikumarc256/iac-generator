provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "iac_rg" {
  name     = "iac-app-rg"
  location = "East US"
}

resource "azurerm_app_service_plan" "plan" {
  name                = "iac-service-plan"
  location            = azurerm_resource_group.iac_rg.location
  resource_group_name = azurerm_resource_group.iac_rg.name
  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "app" {
  name                = "iac-backend-app"
  location            = azurerm_resource_group.iac_rg.location
  resource_group_name = azurerm_resource_group.iac_rg.name
  app_service_plan_id = azurerm_app_service_plan.plan.id
  site_config {
    always_on = true
  }
}
