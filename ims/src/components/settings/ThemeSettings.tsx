import { useTheme } from "@/components/theme/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Laptop, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeType, ColorScheme } from "@/types";

const ThemeSettings = () => {
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();
  
  const themes: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
    {
      value: "light",
      label: "Light",
      icon: <Sun className="h-5 w-5" />,
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className="h-5 w-5" />,
    },
    {
      value: "system",
      label: "System",
      icon: <Laptop className="h-5 w-5" />,
    },
  ];
  
  const colorSchemes: { value: ColorScheme; label: string; color: string }[] = [
    {
      value: "blue",
      label: "Blue",
      color: "bg-blue-500",
    },
    {
      value: "green",
      label: "Green",
      color: "bg-green-500",
    },
    {
      value: "purple",
      label: "Purple",
      color: "bg-purple-500",
    },
    {
      value: "orange",
      label: "Orange",
      color: "bg-orange-500",
    },
    {
      value: "pink",
      label: "Pink",
      color: "bg-pink-500",
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the application looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select a theme for the interface
            </p>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value as ThemeType)}
              className="grid grid-cols-3 gap-4"
            >
              {themes.map((themeOption) => (
                <div key={themeOption.value}>
                  <RadioGroupItem
                    value={themeOption.value}
                    id={`theme-${themeOption.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`theme-${themeOption.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {themeOption.icon}
                    <span className="mt-2">{themeOption.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Color Scheme</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your preferred color scheme
            </p>
            <RadioGroup
              value={colorScheme}
              onValueChange={(value) => setColorScheme(value as ColorScheme)}
              className="grid grid-cols-5 gap-4"
            >
              {colorSchemes.map((scheme) => (
                <div key={scheme.value}>
                  <RadioGroupItem
                    value={scheme.value}
                    id={`scheme-${scheme.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`scheme-${scheme.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className={`w-6 h-6 rounded-full ${scheme.color}`}></div>
                    <span className="mt-2">{scheme.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
