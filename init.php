<?php

if (!wp_next_scheduled('vz_am_remove_old_invites')) {
  wp_schedule_event(time(), 'hourly', 'vz_am_remove_old_invites');
}

$calendar_slug = get_option('vz_am_calendar_slug', 'calendar');
register_post_type('vz-calendar', array(
  'labels' => array(
    'name' => __vz('Calendars'),
    'singular_name' => __vz('Calendar'),
  ),
  'public' => true,
  'has_archive' => true,
  'rewrite' => array('slug' => $calendar_slug),
  'show_ui' => true,	
  'show_in_menu' => 'vz_am_settings',
  'supports' => array('title', 'editor'),
  'show_in_rest' => true,
  'rest_base' => 'vz-calendars',
  'rest_controller_class' => 'WP_REST_Posts_Controller',
  'capability_type' => 'post',
  'map_meta_cap' => true,
));

$invitation_slug = get_option('vz_am_invitation_slug', 'meeting');
register_post_type('vz-am-invite', array(
  'labels' => array(
    'name' => __vz('Invites'),
    'singular_name' => __vz('Invite'),
  ),
  'public' => false,
  // has single
  'has_archive' => false,
  'rewrite' => array('slug' => $invitation_slug),
  'show_ui' => true,	
  'show_in_menu' => 'vz_am_settings',
  'supports' => array('title'),
));

$meeting_slug = get_option('vz_am_meeting_slug', 'meeting');
register_post_type('vz-meeting', array(
  'labels' => array(
    'name' => __vz('Meetings'),
    'singular_name' => __vz('Meeting'),
  ),
  'public' => false,
  // has single
  'has_archive' => false,
  'rewrite' => array('slug' => $meeting_slug),
  'show_ui' => true,	
  'show_in_menu' => 'vz_am_settings',
  'supports' => array('title'),
));



