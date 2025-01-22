using System.Windows;

namespace VolunMate
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        // Event handler for Home button click
        private void Home_Click(object sender, RoutedEventArgs e)
        {
            ShowPanel(IntroPanel);
        }

        // Event handler for Login button click
        private void Login_Click(object sender, RoutedEventArgs e)
        {
            ShowPanel(LoginPanel);
        }

        // Event handler for Sign Up button click
        private void Signup_Click(object sender, RoutedEventArgs e)
        {
            ShowPanel(SignupPanel);
        }

        // Method to show the specified panel and hide others
        private void ShowPanel(UIElement panel)
        {
            // Hide all panels
            IntroPanel.Visibility = Visibility.Hidden;
            LoginPanel.Visibility = Visibility.Hidden;
            SignupPanel.Visibility = Visibility.Hidden;

            // Show the specified panel
            panel.Visibility = Visibility.Visible;
        }
    }
}
