<?php
include('data.php');

// Grab location and service from the URL, default to Andover if empty
$loc_key = isset($_GET['location']) ? strtolower($_GET['location']) : 'andover';
$serv_key = isset($_GET['service']) ? strtolower($_GET['service']) : 'window-cleaning';

// Fallback if someone types a village we haven't added yet
$current_loc = isset($locations[$loc_key]) ? $locations[$loc_key] : ['name' => ucfirst($loc_key), 'landmark' => 'the local area', 'property_type' => 'local homes', 'postcode' => ''];
$current_serv = isset($services[$serv_key]) ? $services[$serv_key] : $services['window-cleaning'];

// Create completely unique SEO Titles and Descriptions dynamically
$page_title = $current_serv['title'] . " " . $current_loc['name'] . " | All Clear Exterior Cleaning";
$meta_desc = "Looking for professional " . strtolower($current_serv['title']) . " in " . $current_loc['name'] . " (" . $current_loc['postcode'] . ")? Reliable, local exterior cleaners serving " . $current_loc['landmark'] . " and surrounds.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title>
    <meta name="description" content="<?php echo $meta_desc; ?>">
    <link rel="stylesheet" href="/style.css"> <!-- Your CSS file -->
</head>
<body>

    <!-- Standard Header (Included automatically on all pages) -->
    <header>
        <div class="logo">All Clear Exterior Cleaning</div>
        <nav>
            <a href="/">Home</a>
            <a href="/whitchurch/window-cleaning">Whitchurch Windows</a>
            <a href="/stockbridge/gutter-cleaning">Stockbridge Gutters</a>
        </nav>
    </header>

    <main>
        <!-- Hero Section -->
        <section class="hero">
            <h1><?php echo $current_serv['main_heading'] . " " . $current_loc['name']; ?></h1>
            <p class="subtitle">Premium domestic and commercial exterior maintenance across the <?php echo $current_loc['postcode']; ?> area.</p>
            <a href="#quote" class="btn">Get a Free Quote</a>
        </section>

        <!-- Deep Service Content Section -->
        <section class="content-block">
            <h2>Our <?php echo $current_serv['title']; ?> Process</h2>
            <p><?php echo $current_serv['intro']; ?></p>
            <p><?php echo $current_serv['process']; ?></p>
        </section>

        <!-- Dynamic Localized Trust Section (Crucial for Google Ranking) -->
        <section class="local-trust">
            <h2>Serving Your Neighborhood in <?php echo $current_loc['name']; ?></h2>
            <p>We regularly service a wide variety of properties in the area, from <?php echo $current_loc['property_type']; ?>. You have likely seen our vans operating near <?php echo $current_loc['landmark']; ?>.</p>
            <blockquote><?php echo $current_serv['local_note']; ?></blockquote>
        </section>

        <!-- Text Reminder USP Section -->
        <section class="usp">
            <h2>The "All Clear" Customer Promise</h2>
            <ul>
                <li><strong>Text Alerts:</strong> You will receive an automated text reminder the evening before we arrive so gates can be unlocked.</li>
                <li><strong>Fully Insured:</strong> Complete peace of mind with comprehensive public liability insurance.</li>
                <li><strong>All-Weather Reliability:</strong> Utilizing specialized equipment that delivers flawless results rain or shine.</li>
            </ul>
        </section>

        <!-- Contact Form (Hardcoded on every dynamic page) -->
        <section id="quote" class="contact-form">
            <h2>Request a Quote for <?php echo $current_loc['name']; ?></h2>
            <p>Fill out the form below, and our team will provide a transparent quote for your property.</p>
            <form action="https://formspree.io/f/YOUR_ID_HERE" method="POST">
                <input type="hidden" name="Location" value="<?php echo $current_loc['name']; ?>">
                <input type="hidden" name="Service" value="<?php echo $current_serv['title']; ?>">
                
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <input type="text" name="phone" placeholder="Phone Number" required>
                <input type="text" name="postcode" placeholder="Postcode (e.g. <?php echo $current_loc['postcode']; ?>)" required>
                <textarea name="message" placeholder="Please describe the size of your property or specific cleaning requirements..."></textarea>
                <button type="submit">Send Booking Request</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; <?php echo date('Y'); ?> All Clear Exterior Cleaning. Serving Andover, <?php echo $current_loc['name']; ?>, and the surrounding Hampshire villages.</p>
    </footer>

</body>
</html>
